import { useCallback, useMemo } from 'react';

import type { IDashboardFilters } from '@/types/api/dashboard.interface';
import { filterDashboardBooks } from '@/utils/dashboardFilters';

import { useActions } from './useActions';
import { useBooks } from './useBooks';
import { useTypedSelector } from './useTypedSelector';

export const useDashboard = () => {
	const { books } = useBooks();
	const { setDashboardFilters, clearDashboardFilters } = useActions();

	const { filters } = useTypedSelector(state => state.dashboardFilters);

	const dashboardBooks = useMemo(() => {
		return filterDashboardBooks(books, filters);
	}, [books, filters]);

	// Обновить фильтры дашборда
	const updateDashboardFilters = useCallback(
		(newFilters: IDashboardFilters) => {
			setDashboardFilters(newFilters);
		},
		[setDashboardFilters]
	);

	const clearDashboard = useCallback(() => {
		clearDashboardFilters();
	}, [clearDashboardFilters]);

	return {
		dashboardBooks,
		updateDashboardFilters,
		clearDashboard
	};
};
