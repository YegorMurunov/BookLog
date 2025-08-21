import { format } from 'date-fns';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
	updateDoc
} from 'firebase/firestore';

import type { IAchievement } from '@/types/api/achievements.interface';

import { auth, db } from './firebase';

// Получение достижений
export const firebaseGetAchievements = async (): Promise<IAchievement[]> => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const achievementsRef = collection(db, 'users', userId, 'achievements');
	const q = query(achievementsRef, orderBy('earnedAt', 'desc'));
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	})) as IAchievement[];
};

// Добавление достижения
export const firebaseAddAchievement = async (
	achievement: Omit<IAchievement, 'check'>
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const achievementRef = doc(
		db,
		'users',
		userId,
		'achievements',
		achievement.id
	);

	await setDoc(achievementRef, {
		...achievement,
		earnedAt: achievement.earnedAt || format(new Date(), 'yyyy-MM-dd')
	});
};

// Удаление достижения
export const firebaseDeleteAchievement = async (achievementId: string) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const achievementRef = doc(
		db,
		'users',
		userId,
		'achievements',
		achievementId
	);
	await deleteDoc(achievementRef);
};

// Обновление книги
export const firebaseUpdateAchievement = async (
	achievementId: string,
	achievementData: Omit<IAchievement, 'id' | 'check'>
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const achievementRef = doc(
		db,
		'users',
		userId,
		'achievements',
		achievementId
	);
	await updateDoc(achievementRef, achievementData);
};
