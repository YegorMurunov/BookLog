import { isAfter, isBefore, isEqual, parseISO } from 'date-fns';

import type { TRating } from '@/configs/dashboard-data';
import type { IBook } from '@/types/api/books.interface';
import type { IDashboardFilters } from '@/types/api/dashboard.interface';

export const filterDashboardBooks = (
	books: IBook[],
	filters: IDashboardFilters
): IBook[] => {
	let filtered = [...books];

	// Фильтр по дате "от" (dateFrom)
	if (filters.dateFrom) {
		const fromDate = parseISO(filters.dateFrom);

		filtered = filtered.filter(book => {
			if (!book.date) return false;

			const bookDate = parseISO(book.date);
			return isAfter(bookDate, fromDate) || isEqual(bookDate, fromDate);
		});
	}

	// Фильтр по дате "до" (dateTo)
	if (filters.dateTo) {
		const toDate = parseISO(filters.dateTo);

		filtered = filtered.filter(book => {
			if (!book.date) return false;

			const bookDate = parseISO(book.date);
			return isBefore(bookDate, toDate) || isEqual(bookDate, toDate);
		});
	}

	// Фильтр по статусу
	if (filters.status && filters.status.length > 0) {
		filtered = filtered.filter(book => filters.status?.includes(book.status));
	}

	// Фильтр по жанрам
	if (filters.genres && filters.genres.length > 0) {
		filtered = filtered.filter(book =>
			book.genres.some(genre => filters.genres!.includes(genre))
		);
	}

	// Фильтр по оценкам
	// Поскольку в фильтре всего 5 вариантов оценок (целых). Придется округлять оценки книг
	if (filters.rating && filters.rating.length > 0) {
		filtered = filtered.filter(book => {
			const bookRating = book.rating < 1 ? 1 : Math.floor(book.rating);
			const bookRatingString = bookRating.toString() as TRating;
			return filters.rating!.includes(bookRatingString);
		});
	}

	return filtered;
};
