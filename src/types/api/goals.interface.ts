export interface IGoal {
	title: string;
	index: number;
	id: string;
	isCompleted: boolean;
}

export interface IGoalsItemProps {
	goal: IGoal;
}

export type TGoalForm = Omit<IGoal, 'id'>;

export interface IGoalsListTitle {
	title: string;
}

export interface IGoalsStats {
	all: number;
	completed: number;
	percent: number;
}
