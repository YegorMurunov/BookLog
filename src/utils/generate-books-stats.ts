import { IBook } from '@/types/api/books.interface';

import { round } from './round.utils';

export const generateMainStats = (booksData: IBook[]) => {
	// main stats
	const mainArr = booksData.filter(
		book => book.status === 'read' || book.status === 'reread'
	);
	const all = booksData.length;

	const read = mainArr.length;
	const bestCount = mainArr.filter(book => book.isTheBestBook).length;
	const underread = booksData.filter(
		book => book.status === 'underread'
	).length;
	const reread = booksData.filter(book => book.status === 'reread').length;
	const reading = booksData.filter(book => book.status === 'reading').length;
	const avgRating =
		round(mainArr.reduce((sum, book) => (sum += book.rating), 0) / read, 1) ||
		0;
	const pagesSum = mainArr.reduce((sum, book) => (sum += book.pageCount), 0);

	return {
		all,
		read,
		bestCount,
		underread,
		reread,
		reading,
		avgRating,
		pagesSum
	};
};

export const generateMonthlyStats = (booksData: IBook[]) => {
	const now = new Date();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	const readBooks = booksData.filter(
		book => book.status === 'read' || book.status === 'reread'
	);

	const readBooksThisMonth = readBooks.filter(book => {
		const bookDate = new Date(book.date);
		const bookMonth = bookDate.getMonth();
		const bookYear = bookDate.getFullYear();
		if (bookMonth === currentMonth && bookYear === currentYear) return book;
	});

	// The number of books read this month
	const booksReadThisMonth = readBooksThisMonth.length;

	// Number of pages read this month
	const pagesReadThisMonth = readBooksThisMonth.reduce(
		(sum, book) => (sum += book.pageCount),
		0
	);

	// Filtering of books read before the current month
	const readBooksBeforeThisMonth = readBooks.filter(book => {
		const bookDate = new Date(book.date);
		const bookMonth = bookDate.getMonth();
		const bookYear = bookDate.getFullYear();

		// Проверка на книги, прочитанные до текущего месяца
		return (
			bookYear < currentYear ||
			(bookYear === currentYear && bookMonth < currentMonth)
		);
	});

	const avgRating =
		round(
			readBooks.reduce((sum, book) => {
				return (sum += book.rating);
			}, 0) / readBooks.length,
			1
		) || 0;

	const avgRatingBeforeThisMonth =
		round(
			readBooksBeforeThisMonth.reduce((sum, book) => (sum += book.rating), 0) /
				readBooksBeforeThisMonth.length,
			1
		) || 0;

	// rating diff
	const ratingDiff = calculatePercentageDifference(
		avgRatingBeforeThisMonth,
		avgRating
	);

	// Quantities of the best books this month
	const bestBookThisMonth = readBooksThisMonth.filter(
		book => book.isTheBestBook
	).length;

	return {
		booksReadThisMonth,
		pagesReadThisMonth,
		ratingDiff,
		bestBookThisMonth
	};
};

export const calculatePercentageDifference = (
	oldRating: number,
	newRating: number
) => {
	console.log(oldRating, newRating);

	if (newRating === 0) {
		return '+0.00%';
	}
	if (oldRating === 0) {
		return '+100.00%';
	}

	const difference: number = ((newRating - oldRating) / oldRating) * 100;
	const differenceStr: string = `${difference >= 0 ? '+' : ''}${difference.toFixed(2)}%`;
	return differenceStr;
};
