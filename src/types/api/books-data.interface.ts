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
