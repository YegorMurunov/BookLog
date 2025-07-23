import type {
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
		color: '#4ba2d8'
	},
	{
		value: 'reading',
		label: 'Читаю сейчас',
		color: '#f3d073'
	}
];

export const BooksGenresData: IBooksGenresData[] = [
	{
		value: 'fantasy',
		label: 'Фэнтези',
		color: 'rgba(103, 25, 138)',
		chartColor: 'rgba(103, 25, 138, 0.6)'
	},
	{
		value: 'fiction',
		label: 'Фантастика',
		color: 'rgb(9, 76, 154)',
		chartColor: 'rgba(9, 76, 154, 0.6)'
	},
	{
		value: 'detective',
		label: 'Детектив',
		color: 'rgb(22, 53, 45)',
		chartColor: 'rgba(22, 53, 45, 0.6)'
	},
	{
		value: 'science-fiction',
		label: 'Научная фантастика',
		color: '#4abdc3',
		chartColor: 'rgba(74, 189, 195, 0.6)'
	},
	{
		value: 'mystery',
		label: 'Мистика',
		color: 'rgb(65, 99, 108)',
		chartColor: 'rgba(65, 99, 108, 0.6)'
	},
	{
		value: 'romance',
		label: 'Роман',
		color: 'rgb(255, 105, 180)',
		chartColor: 'rgba(255, 105, 180, 0.6)'
	},
	{
		value: 'thriller',
		label: 'Триллер',
		color: 'rgb(121,37,37)',
		chartColor: 'rgba(121, 37, 37, 0.6)'
	},
	{
		value: 'historical',
		label: 'Исторический',
		color: 'rgb(222, 187, 132)',
		chartColor: 'rgba(222, 187, 132, 0.6)'
	},
	{
		value: 'philosophy',
		label: 'Философия',
		color: 'rgb(144, 137, 178)',
		chartColor: 'rgba(144, 137, 178, 0.6)'
	},
	{
		value: 'biography',
		label: 'Биография',
		color: 'rgb(33, 155, 144)',
		chartColor: 'rgba(33, 155, 144, 0.6)'
	},
	{
		value: 'psychology',
		label: 'Психология',
		color: 'rgb(130, 84, 208)',
		chartColor: 'rgba(130, 84, 208, 0.6)'
	},
	{
		value: 'business',
		label: 'Бизнес',
		color: 'rgb(40, 178, 116)',
		chartColor: 'rgba(40, 178, 116, 0.6)'
	},
	{
		value: 'horror',
		label: 'Ужасы',
		color: 'rgb(159, 17, 16)',
		chartColor: 'rgba(159, 17, 16, 0.6)'
	},
	{
		value: 'adventure',
		label: 'Приключения',
		color: 'rgb(77, 191, 238)',
		chartColor: 'rgba(77, 191, 238, 0.6)'
	},
	{
		value: 'classics',
		label: 'Классика',
		color: 'rgb(120, 100, 56)',
		chartColor: 'rgba(120, 100, 56, 0.6)'
	},
	{
		value: 'comedy',
		label: 'Комедия',
		color: 'rgb(219, 159, 3)',
		chartColor: 'rgba(219, 159, 3, 0.6)'
	}
];
