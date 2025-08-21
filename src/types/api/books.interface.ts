export type TStatus = 'read' | 'reading' | 'underread' | 'reread';
export type TGenres =
	| 'fantasy'
	| 'fiction'
	| 'detective'
	| 'science-fiction'
	| 'mystery'
	| 'romance'
	| 'thriller'
	| 'historical'
	| 'biography'
	| 'philosophy'
	| 'psychology'
	| 'business'
	| 'horror'
	| 'adventure'
	| 'classics'
	| 'comedy'
	| 'contemporary';

export interface IBook {
	id: string;
	title: string;
	author: string;
	pageCount: number;
	genres: TGenres[];
	status: TStatus;
	date: string; // "YYYY-MM-DD"
	rating: number;
	isTheBestBook: boolean;
	comment: string;
}

export interface IBooksSlice {
	books: IBook[];
	filteredBooks: IBook[];
}

export interface IFilters {
	search?: string;
	status?: TStatus;
	best?: boolean;
}

export interface ITableFiltersState {
	filters: IFilters;
	currentPage: number;
	booksPerPage: number;
	currentSort: TSortState;
}

export type TSortState = {
	type: string;
	direction: 'asc' | 'desc';
};

export interface ISortParams {
	date?: 'asc' | 'desc';
	rating?: 'asc' | 'desc';
	pageCount?: 'asc' | 'desc';
	author?: 'asc' | 'desc';
	title?: 'asc' | 'desc';
}
