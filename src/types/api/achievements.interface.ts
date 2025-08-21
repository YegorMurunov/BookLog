import type { IBook } from './books.interface';

export interface IAchievement {
	title: string;
	description: string;
	icon: string;
	id: string;
	isEarned: boolean;
	check: (books: IBook[]) => boolean;
	earnedAt?: string; // Дата получения достижения в формате ISO
}
