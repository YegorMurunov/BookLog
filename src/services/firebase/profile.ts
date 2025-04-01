import { User, updateProfile } from 'firebase/auth';

export const firebaseUpdateProfile = async (
	user: User,
	updates: {
		displayName?: string;
		photoURL?: string | null;
	}
) => {
	console.log('profile.ts', updates.photoURL);
	const updatedData: { displayName?: string; photoURL?: string } = {
		...updates,
		photoURL: updates.photoURL ? updates.photoURL : ''
	};

	await updateProfile(user, updatedData);

	return user;
};
