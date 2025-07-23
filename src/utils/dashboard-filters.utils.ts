import { isEqual, parseISO, startOfDay, startOfYear } from 'date-fns';

import type { IDashboardFilters } from '@/types/api/dashboard.interface';

import { diffInDays } from './formate-date.utils';

export const calcDefaultPeriod = (filters: IDashboardFilters): number => {
	if (filters.dateFrom && filters.dateTo) {
		const start = parseISO(filters.dateFrom);
		const end = parseISO(filters.dateTo);

		if (
			isEqual(startOfDay(start), startOfYear(new Date())) &&
			isEqual(startOfDay(end), startOfDay(new Date()))
		) {
			return -1; // "Этот год"
		}

		const diffDays = diffInDays(start, end);
		return diffDays > 0 ? diffDays : 30;
	}

	return 30;
};
