import type {
	IGoal,
	IGoalsList,
	IGoalsStats
} from '@/types/api/goals.interface';

import { round } from './round.utils';

export const generateGoalsStats = (goalsLists: IGoalsList[]): IGoalsStats => {
	const goalsData: IGoal[] = [];

	goalsLists.map(list => {
		goalsData.push(...list.goals);
		return list;
	});

	const all = goalsData.length;
	const completed = goalsData.filter(goal => goal.isCompleted).length;
	const percent = all === 0 ? 0 : round((completed / all) * 100, 0);

	return { all, completed, percent };
};
