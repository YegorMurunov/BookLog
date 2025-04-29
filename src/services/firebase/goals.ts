import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
	updateDoc,
	writeBatch
} from 'firebase/firestore';

import { IGoal, IGoalsListTitle } from '@/types/ui/goals.interface';

import { auth, db } from './firebase';

// Получение целей
export const firebaseGetGoals = async (): Promise<IGoal[]> => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const goalsRef = collection(db, 'users', userId, 'goals');
	const q = query(goalsRef, orderBy('index', 'asc'));
	const querySnapshot = await getDocs(q);

	return querySnapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	})) as IGoal[];
};

// Добавление цели
export const firebaseAddGoal = async (goal: Omit<IGoal, 'id'>) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const goalsRef = collection(db, 'users', userId, 'goals');
	await addDoc(goalsRef, { ...goal });
};

// Удаление цели
export const firebaseDeleteGoal = async (goalId: string) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const goalsRef = doc(db, 'users', userId, 'goals', goalId);
	await deleteDoc(goalsRef);
};

// Изменение книги
export const firebaseUpdateGoal = async (
	goalId: string,
	goalData: Partial<Omit<IGoal, 'id'>>
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const goalsRef = doc(db, 'users', userId, 'goals', goalId);
	await updateDoc(goalsRef, goalData);
};

// Изменение порядка целей
export const batchUpdateGoals = async (goals: IGoal[]) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const batch = writeBatch(db);
	goals.forEach(goal => {
		const goalRef = doc(db, 'users', userId, 'goals', goal.id);
		batch.update(goalRef, { index: goal.index });
	});

	await batch.commit();
};

// Изменение названия списка целей
export const firebaseUpdateGoalsTitle = async (title: string) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const titleRef = doc(db, 'users', userId, 'goalsMeta', 'title');
	await setDoc(titleRef, { title }, { merge: true });
};

// Получение названия списка целей
export const firebaseGetGoalsTitle = async (): Promise<IGoalsListTitle> => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const titleRef = doc(db, 'users', userId, 'goalsMeta', 'title');
	const snapshot = await getDoc(titleRef);

	const data = {
		title: snapshot.data()?.title
	};

	return data;
};
