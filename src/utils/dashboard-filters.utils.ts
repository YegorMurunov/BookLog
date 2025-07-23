import { isEqual, parseISO, startOfDay, startOfYear } from 'date-fns';

import type { IDashboardFilters } from '@/types/api/dashboard.interface';

import { diffInDays } from './formate-date.utils';

export const calcDefaultPeriod = (filters: IDashboardFilters): number => {
	if (filters.dateFrom && filters.dateTo) {
		const start = parseISO(filters.dateFrom);
		const end = parseISO(filters.dateTo);

		// проверяем, это ли текущий год
		if (
			isEqual(start, startOfYear(new Date())) &&
			isEqual(end, startOfDay(new Date()))
		) {
			return -1; // "Этот год"
		}

		const diffDays = diffInDays(start, end);
		return diffDays > 0 ? diffDays : 30;
	}

	return 30;
};
