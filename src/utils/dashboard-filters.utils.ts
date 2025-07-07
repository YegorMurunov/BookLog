import { parseISO } from 'date-fns';

import type { IDashboardFilters } from '@/types/api/dashboard.interface';

import { diffInDays } from './formate-date.utils';

export const calcDefaultPeriod = (filters: IDashboardFilters) => {
	if (filters.dateFrom && filters.dateTo) {
		const start = parseISO(filters.dateFrom);
		const end = parseISO(filters.dateTo);
		const diffDays = diffInDays(start, end); // включительно

		return diffDays > 0 ? diffDays : 30; // если отрицательное, ставим дефолт 30
	}
	return 30;
};
