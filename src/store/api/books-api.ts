import {
	firebaseAddBook,
	firebaseDeleteBook,
	firebaseGetBooks,
	firebaseUpdateBook
} from '@/services/firebase/books';
import type { IBook } from '@/types/api/books.interface';
import { toastWithPromise } from '@/utils/toast.utils';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApi = createApi({
	reducerPath: 'booksApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['books'],
	endpoints: builder => ({
		getBooks: builder.query<IBook[], void>({
			async queryFn() {
				try {
					const books = await firebaseGetBooks();
					return { data: books };
				} catch (e) {
					return { error: e };
				}
			},
			providesTags: ['books']
		}),
		addBook: builder.mutation<void, Omit<IBook, 'id'>>({
			async queryFn(book) {
				try {
					await toastWithPromise(() => firebaseAddBook(book), 'addBook');
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['books']
		}),
		deleteBook: builder.mutation<void, string>({
			async queryFn(bookId) {
				try {
					await toastWithPromise(
						() => firebaseDeleteBook(bookId),
						'deleteBook'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['books']
		}),
		updateBook: builder.mutation<
			void,
			{ bookId: string; bookData: Partial<Omit<IBook, 'id'>> }
		>({
			async queryFn({ bookId, bookData }) {
				try {
					await toastWithPromise(
						() => firebaseUpdateBook(bookId, bookData),
						'editBook'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['books']
		})
	})
});

export const {
	useGetBooksQuery,
	useAddBookMutation,
	useDeleteBookMutation,
	useUpdateBookMutation
} = booksApi;
