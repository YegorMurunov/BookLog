import type { TRating } from '@/configs/dashboard-data';

import type { IOptions } from '../ui/custom-select.interface';
import type { TGenres, TStatus } from './books.interface';

export interface IDashboardFilters {
	dateFrom?: string;
	dateTo?: string;
	status: TStatus[];
	genres: TGenres[];
	rating: TRating[];
}
export interface IDashboardState {
	filters: IDashboardFilters;
}
export interface IDashboardFormFilters {
	genres: IOptions[];
	status: IOptions[];
	rating: IOptions[];
	dateFrom?: string;
	dateTo?: string;
}

export interface IDashboardRatingData {
	value: TRating;
	label: string;
	color?: string;
}
