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
	| 'editBook';

export type IToastsMessages = Record<TToastType, IToastsState>;
