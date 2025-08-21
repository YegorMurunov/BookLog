import type { IAchievement } from '@/types/api/achievements.interface';
import * as A from '@/utils/achievements.utils';

export const achievementsData: IAchievement[] = [
	{
		id: 'first-read',
		title: 'Начало положено',
		description: 'Заверши свою первую книгу',
		icon: '📘',
		isEarned: false,
		check: A.firstReadAchievement,
		earnedAt: undefined
	},
	{
		id: 'genre-master',
		title: 'Мастер жанров',
		description: 'Прочти хотя бы по одной книге из 5 разных жанров',
		icon: '🎭',
		isEarned: false,
		check: A.genreMasterAchievement,
		earnedAt: undefined
	},
	{
		id: 'thick-book',
		title: 'Толстяк',
		description: 'Прочти книгу объемом более 2000 страниц',
		icon: '📖',
		isEarned: false,
		check: A.thickBookAchievement,
		earnedAt: undefined
	},
	{
		id: 'rereader',
		title: 'Второй шанс',
		description: 'Перечитай хотя бы одну книгу',
		icon: '🔄',
		isEarned: false,
		check: A.rereaderAchievement,
		earnedAt: undefined
	},
	{
		id: 'best-book',
		title: 'Любимчик',
		description: 'Отметь хотя бы одну книгу как "лучшую"',
		icon: '❤️',
		isEarned: false,
		check: A.bestBookAchievement,
		earnedAt: undefined
	},
	{
		id: 'hipster-reader',
		title: 'Непопсовый',
		description:
			'Прочти книгу вне популярных жанров (фантастика, детектив, роман, фэнтези)',
		icon: '🕶️',
		isEarned: false,
		check: A.hipsterReaderAchievement,
		earnedAt: undefined
	},
	{
		id: 'deep-thinker',
		title: 'Психоанализ',
		description: 'Прочти 3 книги по философии или психологии',
		icon: '🧠',
		isEarned: false,
		check: A.deepThinkerAchievement,
		earnedAt: undefined
	},
	{
		id: 'detective-master',
		title: 'Детектив века',
		description: 'Прочти 3 детектива с рейтингом ≥ 4',
		icon: '🕵️',
		isEarned: false,
		check: A.detectiveMasterAchievement,
		earnedAt: undefined
	},
	{
		id: 'classic-reader',
		title: 'Классик',
		description: 'Прочти классическую книгу объемом 500+ страниц',
		icon: '📜',
		isEarned: false,
		check: A.classicReaderAchievement,
		earnedAt: undefined
	},
	{
		id: 'repeat-master',
		title: 'Повторение — мать учения',
		description: 'Перечитай 3 разные книги',
		icon: '🔁',
		isEarned: false,
		check: A.repeatMasterAchievement,
		earnedAt: undefined
	}
];
