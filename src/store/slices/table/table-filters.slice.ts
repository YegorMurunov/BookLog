import { IFilters, ITableFiltersState } from '@/types/api/books.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ITableFiltersState = {
	filters: {},
	currentPage: 1,
	booksPerPage: 15
};

const tableFilters = createSlice({
	name: 'tableFilters',
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<IFilters>) => {
			state.filters = action.payload;
			state.currentPage = 1;
		},
		clearFilters: state => {
			state.filters = {};
			state.currentPage = 1;
		},
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		}
	}
});

export const { actions, reducer } = tableFilters;

export default tableFilters.reducer;
