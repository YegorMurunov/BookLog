import { IBook, IBooksSlice } from '@/types/api/books.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IBooksSlice = {
	books: [],
	filteredBooks: []
};

const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setBooks: (state, action: PayloadAction<IBook[]>) => {
			state.books = action.payload;
		},
		setFilteredBooks: (state, action: PayloadAction<IBook[]>) => {
			state.filteredBooks = action.payload;
		}
	}
});

export const { actions, reducer } = booksSlice;

export default booksSlice.reducer;
