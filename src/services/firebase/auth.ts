import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile
} from 'firebase/auth';

import { auth, provider } from './firebase';

// Функция входа
export const firebaseSignIn = async (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

// Функция регистрации
export const firebaseSignUp = async (
	email: string,
	password: string,
	displayName: string
) => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);

	await updateProfile(userCredential.user, { displayName });

	return userCredential;
};

// Функция выхода
export const firebaseSignOut = async () => {
	return signOut(auth);
};

// Функция входа через гугл
export const firebaseSignInWithGoogle = async () => {
	const userCredential = await signInWithPopup(auth, provider);

	return userCredential;
};
