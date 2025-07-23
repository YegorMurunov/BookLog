import type { IPredefinedPeriods } from '@/types/date.interface';

export const PREDEFINED_PERIODS: IPredefinedPeriods[] = [
	{ label: '7 дней', days: 7 },
	{ label: '30 дней', days: 30 },
	{ label: '90 дней', days: 90 },
	{ label: 'Этот год', days: -1 } // -1 means "current year"
];
