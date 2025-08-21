import type { IBook } from '@/types/api/books.interface';

export const firstReadAchievement = (books: IBook[]) => {
	return books.some(b => b.status === 'read');
};

export const genreMasterAchievement = (books: IBook[]) => {
	const genres = new Set<string>();
	books.forEach(book => {
		if (book.status === 'read' || book.status === 'reread') {
			book.genres.forEach(g => genres.add(g));
		}
	});
	return genres.size >= 5;
};

export const thickBookAchievement = (books: IBook[]) =>
	books.some(
		b => (b.status === 'read' || b.status === 'reread') && b.pageCount >= 2000
	);

export const rereaderAchievement = (books: IBook[]) =>
	books.some(b => b.status === 'reread');

export const bestBookAchievement = (books: IBook[]) =>
	books.some(b => b.isTheBestBook);

export const hipsterReaderAchievement = (books: IBook[]) =>
	books.some(
		b =>
			(b.status === 'read' || b.status === 'reread') &&
			!b.genres.some(g =>
				['fiction', 'romance', 'detective', 'fantasy'].includes(g)
			)
	);

export const deepThinkerAchievement = (books: IBook[]) => {
	let count = 0;
	for (const b of books) {
		if (
			(b.status === 'read' || b.status === 'reread') &&
			b.genres.some(g => g === 'psychology' || g === 'philosophy')
		) {
			count++;
		}
	}
	return count >= 3;
};

export const detectiveMasterAchievement = (books: IBook[]) =>
	books.filter(
		b =>
			(b.status === 'read' || b.status === 'reread') &&
			b.genres.includes('detective') &&
			b.rating >= 4
	).length >= 3;

export const classicReaderAchievement = (books: IBook[]) =>
	books.some(
		b =>
			(b.status === 'read' || b.status === 'reread') &&
			b.genres.includes('classics') &&
			b.pageCount >= 500
	);

export const repeatMasterAchievement = (books: IBook[]) => {
	const rereads = books.filter(b => b.status === 'reread');
	const uniqueTitles = new Set(rereads.map(b => b.title));
	return uniqueTitles.size >= 3;
};
