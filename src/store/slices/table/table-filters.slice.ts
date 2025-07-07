import type {
	IFilters,
	ITableFiltersState,
	TSortState
} from '@/types/api/books.interface';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ITableFiltersState = {
	filters: {},
	currentPage: 1,
	booksPerPage: 15,
	currentSort: {
		type: 'date',
		direction: 'desc'
	}
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
		},
		setCurrentSort: (state, action: PayloadAction<TSortState>) => {
			state.currentSort = action.payload;
			state.currentPage = 1;
		}
	}
});

export const { actions, reducer } = tableFilters;

export default tableFilters.reducer;
