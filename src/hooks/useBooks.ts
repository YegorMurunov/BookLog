import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';

import { db } from '@/services/firebase/firebase';
import {
	useAddBookMutation,
	useDeleteBookMutation,
	useGetBooksQuery,
	useUpdateBookMutation
} from '@/store/api/books-api';
import {
	IBooksMainStats,
	IBooksMonthlyStats
} from '@/types/api/books-data.interface';
import { IBook, IFilters } from '@/types/api/books.interface';
import {
	generateMainStats,
	generateMonthlyStats
} from '@/utils/generate-books-stats';
import { filterBooks } from '@/utils/tableFilterBooks';

import { useActions } from './useActions';
import { useAuth } from './useAuth';
import { useTypedSelector } from './useTypedSelector';

export const useBooks = () => {
	const { userData } = useAuth();
	const userId = userData.user?.uid;

	const {
		data: cachedBooks,
		isLoading,
		error
	} = useGetBooksQuery(undefined, {
		skip: !userId // Не запрашивать, если юзер не авторизован
	});

	const [books, setBooks] = useState<IBook[]>(cachedBooks || []);

	const { filters, currentPage, booksPerPage } = useTypedSelector(
		state => state.tableFilters
	);

	const { setFilters, setCurrentPage, clearFilters } = useActions();

	const filteredBooks = useMemo(() => {
		return filterBooks(books, filters);
	}, [books, filters]);

	const paginatedBooks = useMemo(() => {
		const startIndex = (currentPage - 1) * booksPerPage;
		const endIndex = startIndex + booksPerPage;
		return filteredBooks.slice(startIndex, endIndex);
	}, [filteredBooks, currentPage, booksPerPage]);

	const prevBooksRef = useRef<IBook[]>(books);
	const prevStatsRef = useRef<{
		main: IBooksMainStats;
		monthly: IBooksMonthlyStats;
	}>({
		main: {
			all: 0,
			read: 0,
			bestCount: 0,
			underread: 0,
			reread: 0,
			reading: 0,
			avgRating: 0,
			pagesSum: 0
		},
		monthly: {
			booksReadThisMonth: 0,
			pagesReadThisMonth: 0,
			ratingDiff: '0%',
			bestBookThisMonth: 0
		}
	});

	const stats = useMemo(() => {
		if (prevBooksRef.current === books) {
			return prevStatsRef.current;
		}

		const mainStats = generateMainStats(books);
		const monthlyStats = generateMonthlyStats(books);

		prevBooksRef.current = books;
		prevStatsRef.current = { main: mainStats, monthly: monthlyStats };
		return prevStatsRef.current;
	}, [books]);

	const [addBookMutation] = useAddBookMutation();
	const [deleteBookMutation] = useDeleteBookMutation();
	const [updateBookMutation] = useUpdateBookMutation();

	// Функции для управления фильтрами и пагинацией
	const handleSetFilters = (newFilters: IFilters) => {
		setFilters(newFilters);
	};

	const handleSetPage = (page: number) => {
		setCurrentPage(page);
	};

	// Подписка на обновления в Firestore
	useEffect(() => {
		if (!userId) return;

		const booksRef = collection(db, 'users', userId, 'books');
		const q = query(booksRef, orderBy('date', 'desc'));

		const unsubscribe = onSnapshot(q, snapshot => {
			const booksData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			})) as IBook[];

			const sortedBooks = booksData.sort((a, b) => {
				if (!a.date && !b.date) return 0;
				if (!a.date) return -1;
				if (!b.date) return 1;

				// Если дата есть у обеих книг — сортируем по убыванию
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});

			setBooks(sortedBooks);
		});

		return () => unsubscribe(); // Отписка при размонтировании
	}, [userId]);

	// Функция добавления книги
	const addBook = async (book: Omit<IBook, 'id'>) => {
		await addBookMutation(book);
	};
	// Функция удаления книги
	const deleteBook = async (bookId: string) => {
		await deleteBookMutation(bookId);
	};

	// Функция обновления книги
	const updateBook = async (
		bookId: string,
		bookData: Partial<Omit<IBook, 'id'>>
	) => {
		await updateBookMutation({ bookId, bookData });
	};

	return {
		books, // cachedBooks || []
		isLoading,
		error,
		addBook,
		deleteBook,
		updateBook,
		filteredBooks,
		stats,
		paginatedBooks,
		totalPages: Math.ceil(filteredBooks.length / booksPerPage),
		currentPage,
		setFilters: handleSetFilters,
		clearFilters,
		setPage: handleSetPage
	};
};
