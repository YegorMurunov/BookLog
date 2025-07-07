import { BooksGenresData, BooksStatusData } from '@/configs/books-data';
import type {
	IBooksGenresData,
	IBooksStatusData
} from '@/types/api/books-data.interface';
import type { TGenres, TStatus } from '@/types/api/books.interface';

export const getGenreDataByValue = (
	genres: TGenres[] | undefined,
	defaultGenres: IBooksGenresData[] = []
): IBooksGenresData[] => {
	if (!genres || genres.length === 0) {
		return defaultGenres.length > 0 ? defaultGenres : [];
	}

	return genres.map(
		bookGenre =>
			BooksGenresData.find(genre => genre.value === bookGenre) || {
				value: bookGenre,
				label: bookGenre.charAt(0).toUpperCase() + bookGenre.slice(1),
				color: undefined
			}
	);
};

export const getStatusDataByValue = (
	status: TStatus | undefined,
	defaultStatus: IBooksStatusData | null = null
): IBooksStatusData | null => {
	if (!status) {
		return defaultStatus;
	}

	return BooksStatusData.find(s => s.value === status) || null;
};

export const getValueByGenres = (genresArr: IBooksGenresData[]) => {
	return genresArr.map(genre => genre.value);
};
