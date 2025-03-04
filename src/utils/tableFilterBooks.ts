import { IBook, IFilters } from '@/types/api/books.interface';

export const filterBooks = (books: IBook[], filters: IFilters): IBook[] => {
	let filtered = [...books];

	const searchQuery =
		filters.search && filters.search.trim() !== '' ? filters.search : false;

	if (searchQuery) {
		filtered = filtered.filter(
			book =>
				book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				book.author.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	if (filters.status) {
		filtered = filtered.filter(book => book.status === filters.status);
	}

	if (filters.best) {
		filtered = filtered.filter(
			book =>
				book.isTheBestBook &&
				(book.status === 'read' || book.status === 'reread')
		);
	}

	return filtered;
};
