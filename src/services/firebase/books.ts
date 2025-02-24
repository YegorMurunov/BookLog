import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc
} from 'firebase/firestore';

import { IBook } from '@/types/api/books.interface';

import { auth, db } from './firebase';

// Получение книг
export const firebaseGetBooks = async (): Promise<IBook[]> => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const booksRef = collection(db, 'users', userId, 'books');
	const q = query(booksRef, orderBy('date', 'desc'));
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	})) as IBook[];
};

// Добавление книги
export const firebaseAddBook = async (book: Omit<IBook, 'id'>) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const booksRef = collection(db, 'users', userId, 'books');
	await addDoc(booksRef, { ...book });
};

// Удаление книги
export const firebaseDeleteBook = async (bookId: string) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const bookRef = doc(db, 'users', userId, 'books', bookId);
	await deleteDoc(bookRef);
};

// Обновление книги
export const firebaseUpdateBook = async (
	bookId: string,
	bookData: Partial<Omit<IBook, 'id'>>
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const bookRef = doc(db, 'users', userId, 'books', bookId);
	await updateDoc(bookRef, bookData);
};
