import { TGenres, TStatus } from './books.interface';

export interface IBooksStatusData {
	value: TStatus;
	label: string;
	color?: string;
}
export interface IBooksGenresData {
	value: TGenres;
	label: string;
	color?: string;
}

export type filter = TStatus | 'all' | 'best';

export interface IBooksFiltersData {
	value: filter;
	label: string;
}
