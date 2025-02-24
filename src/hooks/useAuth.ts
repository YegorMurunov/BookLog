import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { useActions } from '@/hooks/useActions';
import {
	firebaseSignIn,
	firebaseSignInWithGoogle,
	firebaseSignOut,
	firebaseSignUp
} from '@/services/firebase/auth';
import { auth } from '@/services/firebase/firebase';
import { IUser, IUserData } from '@/types/user.interface';
import { toastWithPromise } from '@/utils/toast.utils';

export const useAuth = () => {
	const { setUser, setLoading, logoutUser } = useActions();
	const [userData, setUserData] = useState<IUser>({
		user: null,
		isAuth: false,
		isLoading: true
	});
	useEffect(() => {
		setLoading(true);
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				const userData: IUserData = {
					email: user.email!,
					uid: user.uid,
					refreshToken: user.refreshToken,
					displayName: user.displayName,
					photoURL: user.photoURL
				};

				setUserData({
					user: userData,
					isAuth: true,
					isLoading: false
				});
				setUser(userData);
			} else {
				setUserData({
					user: null,
					isAuth: false,
					isLoading: false
				});
				logoutUser();
			}
		});
		return () => unsubscribe();
	}, [setUser, setLoading, logoutUser]);

	// Функция входа
	const signIn = async (email: string, password: string) => {
		try {
			const signInPromise = firebaseSignIn(email, password);
			toastWithPromise(() => signInPromise, 'login');

			const userCredential = await signInPromise;
			const user = userCredential.user;
			const userData: IUserData = {
				email: user.email!,
				uid: user.uid,
				refreshToken: user.refreshToken,
				displayName: user.displayName
			};

			setUserData({
				user: userData,
				isAuth: true,
				isLoading: true
			});
			setUser(userData);
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				console.error('Sign in error:', error.message);
			} else {
				console.error('Unknown error:', error);
			}
			throw error;
		}
	};

	// Функция регистрации
	const signUp = async (
		email: string,
		password: string,
		displayName: string
	) => {
		try {
			const signUpPromise = firebaseSignUp(email, password, displayName);
			toastWithPromise(() => signUpPromise, 'register');

			const userCredential = await signUpPromise;
			const user = userCredential.user;

			const userData: IUserData = {
				email: user.email!,
				uid: user.uid,
				refreshToken: user.refreshToken,
				displayName: user.displayName,
				photoURL: null
			};

			setUserData({
				user: userData,
				isAuth: true,
				isLoading: false
			});
			setUser(userData);
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				console.error('Sign up error:', error.message);
			} else {
				console.error('Unknown error:', error);
			}
			throw Error;
		}
	};

	// Функция выхода
	const logOut = async () => {
		try {
			const logOutPromise = firebaseSignOut();
			toastWithPromise(() => logOutPromise, 'logout');

			await logOutPromise;
			setUserData({
				user: null,
				isAuth: false,
				isLoading: false
			});
			logoutUser();
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				console.error('Log out error:', error.message);
			} else {
				console.error('Unknown error:', error);
			}
			throw Error;
		}
	};

	const signInWithGoogle = async () => {
		try {
			const signInWithGoogle = firebaseSignInWithGoogle();
			toastWithPromise(() => signInWithGoogle, 'google');

			const userCredential = await signInWithGoogle;
			const user = userCredential.user;

			const userData: IUserData = {
				email: user.email!,
				uid: user.uid,
				refreshToken: user.refreshToken,
				displayName: user.displayName,
				photoURL: user.photoURL || null
			};

			setUserData({
				user: userData,
				isAuth: true,
				isLoading: false
			});
			setUser(userData);
		} catch (error: unknown) {
			if (error instanceof FirebaseError) {
				console.error('Sign in with google error:', error.message);
			} else {
				console.error('Unknown error:', error);
			}
			throw Error;
		}
	};

	return {
		userData,
		signIn,
		signUp,
		logOut,
		signInWithGoogle
	};
};
