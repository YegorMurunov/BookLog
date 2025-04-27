import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '@/services/firebase/firebase';
import {
	useAddGoalMutation,
	useBatchUpdateGoalsMutation,
	useDeleteGoalMutation,
	useGetGoalsQuery,
	useUpdateGoalMutation
} from '@/store/api/goals-api';
import { IGoal } from '@/types/ui/goals.interface';

import { useAuth } from './useAuth';

export const useGoals = () => {
	const { userData } = useAuth();
	const userId = userData.user?.uid;

	const {
		data: cachedGoals,
		isLoading,
		error
	} = useGetGoalsQuery(undefined, {
		skip: !userId // Не запрашивать, если юзер не авторизован
	});

	const [goals, setGoals] = useState<IGoal[]>(cachedGoals || []);

	const [addGoalMutation] = useAddGoalMutation();
	const [deleteGoalMutation] = useDeleteGoalMutation();
	const [updateGoalMutation] = useUpdateGoalMutation();
	const [batchUpdateGoals] = useBatchUpdateGoalsMutation();

	// Подписка на обновления в Firestore
	useEffect(() => {
		if (!userId) return;

		const goalsRef = collection(db, 'users', userId, 'goals');
		const q = query(goalsRef, orderBy('index', 'asc'));

		const unsubscribe = onSnapshot(q, snapshot => {
			const goalsData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			})) as IGoal[];

			setGoals(goalsData);
		});

		return () => unsubscribe(); // Отписка при размонтировании
	}, [userId]);

	// Функция добавления цели
	const addGoal = async (goal: Omit<IGoal, 'id'>) => {
		await addGoalMutation(goal);
	};
	// Функция удаления цели
	const deleteGoal = async (goalId: string) => {
		await deleteGoalMutation(goalId);
	};

	// Функция обновления цели
	const updateGoal = async (
		goalId: string,
		goalData: Partial<Omit<IGoal, 'id'>>
	) => {
		await updateGoalMutation({ goalId, goalData });
	};

	// Функция переупорядочивания целей
	const reorderGoals = async (goals: IGoal[]) => {
		await batchUpdateGoals(goals);
	};

	return {
		goals,
		isLoading,
		error,
		addGoal,
		deleteGoal,
		updateGoal,
		reorderGoals
	};
};
