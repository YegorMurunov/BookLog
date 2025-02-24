import {
	IBooksGenresData,
	IBooksStatusData
} from '@/types/api/books-data.interface';

export const BooksStatusData: IBooksStatusData[] = [
	{
		value: 'read',
		label: 'Прочитано',
		color: '#69b05d'
	},
	{
		value: 'underread',
		label: 'Не дочитано',
		color: '#d94126'
	},
	{
		value: 'reread',
		label: 'Перечитано',
		color: '#4ba2d8' // #75c4fc
	},
	{
		value: 'reading',
		label: 'Читаю сейчас',
		color: '#f3d073'
	}
];

export const BooksGenresData: IBooksGenresData[] = [
	{ value: 'fantasy', label: 'Фэнтези', color: 'rgba(103, 25, 138)' }, // rgba(190, 140, 255)
	{ value: 'fiction', label: 'Фантастика', color: 'rgb(9, 76, 154)' },
	{ value: 'detective', label: 'Детектив', color: 'rgb(22, 53, 45)' },
	{
		value: 'science-fiction',
		label: 'Научная фантастика',
		color: '#4abdc3'
	},
	{ value: 'mystery', label: 'Мистика', color: 'rgb(65, 99, 108)' },
	{ value: 'romance', label: 'Роман', color: 'rgb(255, 105, 180)' },
	{ value: 'thriller', label: 'Триллер', color: 'rgb(121,37,37)' },
	{
		value: 'historical',
		label: 'Исторический',
		color: 'rgb(222, 187, 132)'
	},
	{ value: 'philosophy', label: 'Философия', color: 'rgb(144, 137, 178)' },
	{ value: 'biography', label: 'Биография', color: 'rgb(33, 155, 144)' },
	{ value: 'psychology', label: 'Психология', color: 'rgb(130, 84, 208)' },
	{ value: 'business', label: 'Бизнес', color: 'rgb(40, 178, 116)' },
	{ value: 'horror', label: 'Ужасы', color: 'rgb(159, 17, 16)' },
	{ value: 'adventure', label: 'Приключения', color: 'rgb(77, 191, 238)' },
	{ value: 'classics', label: 'Классика', color: 'rgb(120, 100, 56)' },
	{ value: 'comedy', label: 'Комедия', color: 'rgb(219, 159, 3)' }
];
