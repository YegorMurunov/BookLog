import type { IBooksFiltersData } from '@/types/api/books-data.interface';

export const BooksFiltersData: IBooksFiltersData[] = [
	{
		value: 'all',
		label: 'Все'
	},
	{
		value: 'best',
		label: 'Лучшие'
	},
	{
		value: 'underread',
		label: 'Недочитанные'
	},
	{
		value: 'reread',
		label: 'Перечитанные'
	},
	{
		value: 'reading',
		label: 'Читаю сейчас'
	}
];
