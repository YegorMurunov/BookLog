import {
	ArrowDown01,
	ArrowDown10,
	ArrowDownAZ,
	ArrowDownZA
} from 'lucide-react';

import type { ITableColumns } from '@/types/ui/table.interface';

export const tableColumns: ITableColumns[] = [
	{
		id: 'isTheBest',
		label: '',
		isSortable: false
	},
	{
		id: 'title',
		label: 'Название',
		isSortable: true,
		iconAsc: ArrowDownAZ,
		iconDesc: ArrowDownZA,
		defaultSort: 'asc'
	},
	{
		id: 'author',
		label: 'Автор',
		isSortable: true,
		iconAsc: ArrowDownAZ,
		iconDesc: ArrowDownZA,
		defaultSort: 'asc'
	},
	{ id: 'genres', label: 'Жанры', isSortable: false },
	{
		id: 'pageCount',
		label: 'Кол-во страниц',
		isSortable: true,
		iconAsc: ArrowDown01,
		iconDesc: ArrowDown10,
		defaultSort: 'desc'
	},
	{
		id: 'status',
		label: 'Статус',
		isSortable: false
	},
	{
		id: 'date',
		label: 'Дата',
		isSortable: true,
		iconAsc: ArrowDown01,
		iconDesc: ArrowDown10,
		defaultSort: 'desc'
	},
	{
		id: 'rating',
		label: 'Оценка',
		isSortable: true,
		iconAsc: ArrowDown01,
		iconDesc: ArrowDown10,
		defaultSort: 'desc'
	},
	{
		id: 'comment',
		label: 'Примечания',
		isSortable: false
	},
	{
		id: 'edit',
		label: '',
		isSortable: false
	}
];
