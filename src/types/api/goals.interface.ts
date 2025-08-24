export interface IGoal {
	title: string;
	index: number;
	id: string;
	isCompleted: boolean;
}

export interface IGoalsList {
	id: string;
	title: string;
	createdAt: string; // ISO дата создания
	goals: IGoal[];
}

export interface GoalsListItemProps {
	list: IGoalsList;
}

export interface IListTitleProps {
	list: IGoalsList;
}
export interface IGoalsListTitle {
	title: string;
}

export interface IGoalsItemProps {
	goal: IGoal;
	listId: string;
}

export type TGoalForm = Omit<IGoal, 'id'>;

export interface IGoalsStats {
	all: number;
	completed: number;
	percent: number;
}
