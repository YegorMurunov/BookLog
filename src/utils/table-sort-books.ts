import type { IBook, ISortParams } from '@/types/api/books.interface';

export const sortBooks = (books: IBook[], sortParams: ISortParams): IBook[] => {
	const sorted = [...books];

	// Сортировка по дате
	if (sortParams.date) {
		sorted.sort((a, b) => {
			const aDate = a.date ? new Date(a.date).getTime() : null;
			const bDate = b.date ? new Date(b.date).getTime() : null;

			// Оба пустые — считаем равными
			if (aDate === null && bDate === null) return 0;

			// Если у a нет даты — он должен быть выше
			if (aDate === null) return -1;
			// Если у b нет даты — он должен быть выше
			if (bDate === null) return 1;

			// Обычная сортировка по дате
			return sortParams.date === 'asc' ? aDate - bDate : bDate - aDate;
		});
	}

	// Сортировка по рейтингу
	if (sortParams.rating) {
		sorted.sort((a, b) => {
			const aRating = a.rating ?? null;
			const bRating = b.rating ?? null;

			if (aRating === bRating) return 0;
			if (aRating === null) return sortParams.rating === 'asc' ? 1 : -1;
			if (bRating === null) return sortParams.rating === 'asc' ? -1 : 1;

			return sortParams.rating === 'asc'
				? aRating - bRating
				: bRating - aRating;
		});
	}

	// Сортировка по количеству страниц
	if (sortParams.pageCount) {
		sorted.sort((a, b) => {
			const aPages = a.pageCount ?? null;
			const bPages = b.pageCount ?? null;

			if (aPages === bPages) return 0;
			if (aPages === null) return sortParams.pageCount === 'asc' ? 1 : -1;
			if (bPages === null) return sortParams.pageCount === 'asc' ? -1 : 1;

			return sortParams.pageCount === 'asc' ? aPages - bPages : bPages - aPages;
		});
	}

	// Сортировка по автору
	if (sortParams.author) {
		sorted.sort((a, b) => {
			const aAuthor = a.author?.toLowerCase() ?? '';
			const bAuthor = b.author?.toLowerCase() ?? '';

			if (aAuthor === bAuthor) return 0;

			return sortParams.author === 'asc'
				? aAuthor.localeCompare(bAuthor)
				: bAuthor.localeCompare(aAuthor);
		});
	}

	// Сортировка по названию
	if (sortParams.title) {
		sorted.sort((a, b) => {
			const aTitle = a.title?.toLowerCase() ?? '';
			const bTitle = b.title?.toLowerCase() ?? '';

			if (aTitle === bTitle) return 0;

			return sortParams.title === 'asc'
				? aTitle.localeCompare(bTitle)
				: bTitle.localeCompare(aTitle);
		});
	}

	return sorted;
};
