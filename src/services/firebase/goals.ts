import { formatISO } from 'date-fns';
import {
	addDoc,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc
} from 'firebase/firestore';

import type { IGoal, IGoalsList } from '@/types/api/goals.interface';

import { auth, db } from './firebase';

// ================ Списки ================

// Создание списка
export const firebaseAddGoalsList = async (title: string) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listsRef = collection(db, 'users', userId, 'goalsLists');
	await addDoc(listsRef, {
		title,
		createdAt: formatISO(new Date()),
		goals: []
	});
};

// Получить все списки целей (с title, id и т.д.)
export const firebaseGetGoalsLists = async (): Promise<IGoalsList[]> => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listsRef = collection(db, 'users', userId, 'goalsLists');
	const snapshot = await getDocs(listsRef);

	return snapshot.docs.map(doc => ({
		id: doc.id,
		...doc.data()
	})) as IGoalsList[];
};

// Получить один список целей
export const firebaseGetGoalsList = async (
	listId: string
): Promise<IGoalsList> => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	const snapshot = await getDoc(listRef);

	if (!snapshot.exists()) throw new Error('Goals list not found');

	return {
		id: snapshot.id,
		...(snapshot.data() as Omit<IGoalsList, 'id'>)
	};
};

// Удалить список
export const firebaseDeleteGoalsList = async (listId: string) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	await deleteDoc(listRef);
};

// Обновить список (например, поменять title)
export const firebaseRenameGoalsList = async (
	listId: string,
	title: string
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	await setDoc(listRef, { title }, { merge: true });
};

// ================ Цели ================

// Добавление цели
export const firebaseAddGoal = async (
	listId: string,
	goal: Omit<IGoal, 'id'>
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	const snapshot = await getDoc(listRef);
	if (!snapshot.exists()) throw new Error('List not found');

	// const goalsRef = collection(
	// 	db,
	// 	'users',
	// 	userId,
	// 	'goalsLists',
	// 	listId,
	// 	'goals'
	// );

	// await addDoc(goalsRef, { ...goal });

	await updateDoc(listRef, {
		goals: arrayUnion({ id: crypto.randomUUID(), ...goal })
	});
};

// Удаление цели
export const firebaseDeleteGoal = async (listId: string, goalId: string) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	const snapshot = await getDoc(listRef);
	if (!snapshot.exists()) throw new Error('List not found');

	const listData = snapshot.data();
	const updatedGoals = (listData?.goals || []).filter(
		(goal: IGoal) => goal.id !== goalId
	);

	await updateDoc(listRef, { goals: updatedGoals });
};

// Изменение цели
export const firebaseUpdateGoal = async (
	listId: string,
	goalId: string,
	goalData: Partial<Omit<IGoal, 'id'>>
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	const snapshot = await getDoc(listRef);
	if (!snapshot.exists()) throw new Error('List not found');

	const listData = snapshot.data();
	const updatedGoals = (listData?.goals || []).map((goal: IGoal) =>
		goal.id === goalId ? { ...goal, ...goalData } : goal
	);

	await updateDoc(listRef, { goals: updatedGoals });
};

// Изменение порядка целей
export const batchUpdateGoals = async (listId: string, goals: IGoal[]) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	await updateDoc(listRef, { goals });

	// const batch = writeBatch(db);
	// goals.forEach(goal => {
	// 	const goalRef = doc(
	// 		db,
	// 		'users',
	// 		userId,
	// 		'goalsLists',
	// 		listId,
	// 		'goals',
	// 		goal.id
	// 	);
	// 	batch.update(goalRef, { index: goal.index });
	// });

	// await batch.commit();
};

// Изменение названия списка целей
export const firebaseUpdateGoalsTitle = async (
	listId: string,
	title: string
) => {
	const userId = auth.currentUser?.uid;
	if (!userId) throw new Error('User ID is undefined');

	const listRef = doc(db, 'users', userId, 'goalsLists', listId);
	await setDoc(listRef, { title }, { merge: true });
};
