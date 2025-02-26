import { IBook } from '../api/books.interface';

export interface ITableItemProps {
	book: IBook;
	index?: number;
}
