import type { IDashboardRatingData } from '@/types/api/dashboard.interface';

export type TRating = '1' | '2' | '3' | '4' | '5';

export const DashboardRatingData: IDashboardRatingData[] = [
	{
		value: '1',
		label: '⭐'
	},
	{
		value: '2',
		label: '⭐⭐'
	},
	{
		value: '3',
		label: '⭐⭐⭐'
	},
	{
		value: '4',
		label: '⭐⭐⭐⭐'
	},
	{
		value: '5',
		label: '⭐⭐⭐⭐⭐'
	}
];
