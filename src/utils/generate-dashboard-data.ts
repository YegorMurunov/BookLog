import type { ChartData, ChartDataset } from 'chart.js';
import { differenceInDays, format, parseISO, startOfWeek } from 'date-fns';

import { BooksGenresData, BooksStatusData } from '@/configs/books-data';
import { AuthorsChartColor, AuthorsChartOtherColor } from '@/configs/chart';
import type { IBook, TStatus } from '@/types/api/books.interface';

import { normalizeRaw } from './normalize-raw';

export const generateGenresData = (books: IBook[]) => {
	const genreCounts: Record<string, number> = {};

	books.forEach(book => {
		book.genres.forEach(genre => {
			if (genreCounts[genre]) {
				genreCounts[genre]++;
			} else {
				genreCounts[genre] = 1;
			}
		});
	});

	const genreValues: string[] = Object.keys(genreCounts);
	const genreValuesOnlyWithCount = genreValues.filter(
		genre => genreCounts[genre] > 0
	);

	const genreDataNumbersByValues: number[] = genreValuesOnlyWithCount.map(
		genre => genreCounts[genre]
	);
	const genreDataLagelsByValues: string[] = genreValuesOnlyWithCount.map(
		genre => BooksGenresData.find(g => g.value === genre)?.label || genre
	);
	const colors: string[] = genreValuesOnlyWithCount.map(
		genre => BooksGenresData.find(g => g.value === genre)?.chartColor || ''
	);

	return {
		dataNumbers: genreDataNumbersByValues,
		labels: genreDataLagelsByValues,
		backgroundColor: colors
	};
};

export function generateStatusChartData(
	books: IBook[],
	startDateStr: string,
	endDateStr: string
): ChartData<'bar', (number | null)[]> {
	const startDate = parseISO(startDateStr);
	const endDate = parseISO(endDateStr);
	const totalDays = differenceInDays(endDate, startDate) + 1;

	const groupBy = totalDays <= 14 ? 'day' : totalDays <= 60 ? 'week' : 'month';

	const grouped: Record<string, Record<TStatus, number>> = {};

	books.forEach(book => {
		const bookDate = parseISO(book.date);
		if (bookDate >= startDate && bookDate <= endDate) {
			let key: string;

			if (groupBy === 'day') {
				key = format(bookDate, 'yyyy-MM-dd');
			} else if (groupBy === 'week') {
				const weekStart = startOfWeek(bookDate, { weekStartsOn: 1 });
				key = format(weekStart, 'yyyy-MM-dd');
			} else {
				key = format(bookDate, 'yyyy-MM');
			}

			if (!grouped[key]) {
				grouped[key] = {
					read: 0,
					reading: 0,
					reread: 0,
					underread: 0
				};
			}

			grouped[key][book.status]++;
		}
	});

	const labels = Object.keys(grouped).sort();

	const datasets: ChartDataset<'bar', (number | null)[]>[] = (
		['read', 'reading', 'reread', 'underread'] as TStatus[]
	).map(status => ({
		label: BooksStatusData.find(s => s.value === status)?.label || status,
		data: labels.map(label => grouped[label]?.[status] || 0),
		backgroundColor:
			BooksStatusData.find(s => s.value === status)?.color ||
			'rgba(0, 0, 0, 0.1)'
	}));

	return {
		labels,
		datasets
	};
}

export const generateAuthorsData = (books: IBook[]) => {
	const authorCounts: Record<string, number> = {};
	const authorLabelsMap: Record<string, string> = {};

	books.forEach(book => {
		const rawAuthor = book.author || 'Без автора';

		// Нормализация имени:
		const normalizedAuthor = normalizeRaw(rawAuthor).toLowerCase();

		// Запоминаем нормализованное отображаемое имя (в оригинальном виде, но очищенное)
		if (!authorLabelsMap[normalizedAuthor]) {
			const cleanedLabel = normalizeRaw(rawAuthor);
			authorLabelsMap[normalizedAuthor] = cleanedLabel;
		}

		authorCounts[normalizedAuthor] = (authorCounts[normalizedAuthor] || 0) + 1;
	});

	// Сортировка и топ-10
	const sortedAuthors = Object.entries(authorCounts).sort(
		(a, b) => b[1] - a[1]
	);

	const topAuthors = sortedAuthors.slice(0, 10);
	const otherAuthors = sortedAuthors.slice(10);

	const labels: string[] = [];
	const data: number[] = [];
	const backgroundColor: string[] = [];

	topAuthors.forEach(([normalized, count], index) => {
		labels.push(authorLabelsMap[normalized]);
		data.push(count);
		backgroundColor.push(AuthorsChartColor[index % AuthorsChartColor.length]);
	});

	if (otherAuthors.length > 0) {
		const othersCount = otherAuthors.reduce((acc, [, count]) => acc + count, 0);
		labels.push('Остальные');
		data.push(othersCount);
		backgroundColor.push(AuthorsChartOtherColor);
	}

	return {
		data,
		labels,
		backgroundColor
	};
};
