import type { LucideIcon } from 'lucide-react';

import type { IBook } from '../api/books.interface';

export interface ITableItemProps {
	book: IBook;
	index?: number;
}

export interface ITableColumns {
	id: string;
	label: string;
	iconAsc?: LucideIcon;
	iconDesc?: LucideIcon;
	isSortable?: boolean;
	defaultSort?: 'asc' | 'desc';
}
