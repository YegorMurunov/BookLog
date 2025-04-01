export interface IUserData {
	email: string;
	uid: string;
	refreshToken: string;
	displayName: string | null;
	photoURL?: string | null;
	creationTime: string;
}

export interface IUser {
	user: IUserData | null;
	isAuth: boolean;
	isLoading: boolean;
}

export interface IUserUpdateProfile {
	displayName: string;
	photoURL: string | null;
}
