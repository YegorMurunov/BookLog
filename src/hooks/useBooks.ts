import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { db } from '@/services/firebase/firebase';
import {
	useAddBookMutation,
	useDeleteBookMutation,
	useGetBooksQuery,
	useUpdateBookMutation
} from '@/store/api/books-api';
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

	const stats = useMemo(() => {
		const mainStats = generateMainStats(cachedBooks || []);
		const monthlyStats = generateMonthlyStats(cachedBooks || []);
		return { main: mainStats, monthly: monthlyStats };
	}, [cachedBooks]);

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
			setBooks(booksData);
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
