import { TStatus } from './books.interface';

export type filter = TStatus | 'all' | 'best';

export interface IBooksFiltersData {
	value: filter;
	label: string;
}
