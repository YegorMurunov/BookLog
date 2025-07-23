import { format, startOfYear } from 'date-fns';

import type {
	IDashboardFilters,
	IDashboardState
} from '@/types/api/dashboard.interface';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

// Вычисляем начальные даты
const today = new Date();
// const thirtyDaysAgo = subDays(today, 29); // 30 дней включая сегодня

// Дефолтное значение даты — с 01.01, текущего года, по сегодня
const firstDayOfYear = startOfYear(today); // startOfYear(today)

const initialState: IDashboardState = {
	filters: {
		dateFrom: format(firstDayOfYear, 'yyyy-MM-dd'), // thirtyDaysAgo
		dateTo: format(today, 'yyyy-MM-dd'),
		status: [],
		genres: [],
		rating: []
	}
};

const dashboardFilters = createSlice({
	name: 'dashboardFilters',
	initialState,
	reducers: {
		setDashboardFilters: (state, action: PayloadAction<IDashboardFilters>) => {
			state.filters = action.payload;
		},
		clearDashboardFilters: state => {
			state.filters = {
				dateFrom: undefined,
				dateTo: undefined,
				status: [],
				genres: [],
				rating: []
			};
		}
	}
});

export const { actions, reducer } = dashboardFilters;

export default dashboardFilters.reducer;
