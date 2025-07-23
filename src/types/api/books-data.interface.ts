import type { TGenres, TStatus } from './books.interface';

export interface IBooksStatusData {
	value: TStatus;
	label: string;
	color?: string;
	chartColor?: string;
}
export interface IBooksGenresData {
	value: TGenres;
	label: string;
	color?: string;
	chartColor?: string;
}

export type filter = TStatus | 'all' | 'best';

export interface IBooksFiltersData {
	value: filter;
	label: string;
}

export interface IBooksMainStats {
	all: number;
	read: number;
	bestCount: number;
	underread: number;
	reread: number;
	reading: number;
	avgRating: number;
	pagesSum: number;
}

export interface IBooksMonthlyStats {
	booksReadThisMonth: number;
	pagesReadThisMonth: number;
	ratingDiff: string;
	bestBookThisMonth: number;
	rereadBooksThisMonth: number;
}
