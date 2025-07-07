import type { IBook } from '../api/books.interface';

export type TModalType = 'create' | 'edit';

export interface IModalSlice {
	book: IBook | null;
	type: TModalType;
	isOpen: boolean;
}
