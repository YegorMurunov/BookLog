interface IToastsError {
	[key: string]: string;
}

interface IToastsState {
	success: string;
	loading: string;
	error: IToastsError;
}

export type TToastType =
	| 'login'
	| 'register'
	| 'logout'
	| 'google'
	| 'deleteBook'
	| 'addBook'
	| 'editBook'
	| 'updateProfile'
	| 'deleteGoal'
	| 'addGoal'
	| 'editGoal'
	| 'reorderGoals'
	| 'editGoalTitle'
	| 'addGoalsList'
	| 'deleteGoalsList';

export type IToastsMessages = Record<TToastType, IToastsState>;
