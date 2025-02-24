import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/services/firebase/firebase';
import {
	useAddBookMutation,
	useDeleteBookMutation,
	useGetBooksQuery,
	useUpdateBookMutation
} from '@/store/api/books-api';
import { IBook } from '@/types/api/books.interface';
import {
	generateMainStats,
	generateMonthlyStats
} from '@/utils/generate-books-stats';

import { useAuth } from './useAuth';

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
	const [filteredBooks, setFilteredBooks] = useState<IBook[]>(books);

	const [stats, setStats] = useState({
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
	const [addBookMutation] = useAddBookMutation();
	const [deleteBookMutation] = useDeleteBookMutation();
	const [updateBookMutation] = useUpdateBookMutation();

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

			setFilteredBooks(booksData);

			const mainStats = generateMainStats(booksData);
			const monthlyStats = generateMonthlyStats(booksData);

			setStats({ main: mainStats, monthly: monthlyStats });
		});

		return () => unsubscribe(); // Отписка при размонтировании
	}, [userId, setFilteredBooks]);

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
		books,
		isLoading,
		error,
		addBook,
		deleteBook,
		updateBook,
		filteredBooks,
		stats
	};
};
