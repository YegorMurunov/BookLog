import type { IGoal, IGoalsStats } from '@/types/ui/goals.interface';

import { round } from './round.utils';

export const generateGoalsStats = (goalsData: IGoal[]): IGoalsStats => {
	const all = goalsData.length;
	const completed = goalsData.filter(goal => goal.isCompleted).length;
	const percent = all === 0 ? 0 : round((completed / all) * 100, 0);

	return { all, completed, percent };
};
