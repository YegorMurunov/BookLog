import { FirebaseError } from 'firebase/app';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

import { auth } from './firebase';

const storage = getStorage();
const user = auth.currentUser;

export const uploadPhotoUrl = (file: File) => {
	try {
		if (!user) {
			throw new Error('Пользователь не авторизован');
		}
		const storageRef = ref(storage, `avatars/${user.uid}`);

		uploadBytes(storageRef, file).then(snapshot => {
			console.log('Файл загружен!');
			console.log(snapshot);
		});
	} catch (error: unknown) {
		if (error instanceof FirebaseError) {
			console.error('Upload photo error:', error.message);
		} else {
			console.error('Unknown error:', error);
		}
		throw error;
	}
};
