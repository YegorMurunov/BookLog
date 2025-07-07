import type {
	IBooksGenresData,
	IBooksStatusData
} from '../api/books-data.interface';
import type { IBook } from '../api/books.interface';

export type formType = Pick<
	IBook,
	'title' | 'author' | 'date' | 'rating' | 'comment' | 'isTheBestBook'
> & {
	pageCount?: number | null;
	genres: IBooksGenresData[];
	status: IBooksStatusData | null;
};
