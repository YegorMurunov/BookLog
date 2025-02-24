import {
	IBooksGenresData,
	IBooksStatusData
} from '../api/books-data.interface';
import { IBook } from '../api/books.interface';

export type formType = Pick<
	IBook,
	'title' | 'author' | 'date' | 'rating' | 'comment' | 'isTheBestBook'
> & {
	pageCount?: number | null;
	genres: IBooksGenresData[];
	status: IBooksStatusData | null;
};
