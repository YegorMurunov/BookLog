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
	| 'comedy';

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
