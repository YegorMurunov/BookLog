import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';

import { db } from '@/services/firebase/firebase';
import {
	useAddGoalMutation,
	useAddGoalsListMutation,
	useBatchUpdateGoalsMutation,
	useDeleteGoalMutation,
	useDeleteGoalsListMutation,
	useGetGoalsListsQuery,
	useRenameGoalsListMutation,
	useUpdateGoalMutation
} from '@/store/api/goals-api';
import type {
	IGoal,
	IGoalsList,
	IGoalsStats
} from '@/types/api/goals.interface';
import { generateGoalsStats } from '@/utils/genetate-goals-stats';

import { useAuth } from './useAuth';

export const useGoals = () => {
	const { userData } = useAuth();
	const userId = userData.user?.uid;

	// Получение целей
	const {
		data: cachedLists,
		isLoading,
		error
	} = useGetGoalsListsQuery(undefined, {
		skip: !userId // Не запрашивать, если юзер не авторизован
	});

	const [lists, setLists] = useState<IGoalsList[]>(cachedLists || []);

	const [addGoalsListMutation] = useAddGoalsListMutation();
	const [deleteGoalsListMutation] = useDeleteGoalsListMutation();
	const [renameGoalsListMutation] = useRenameGoalsListMutation();

	const [addGoalMutation] = useAddGoalMutation();
	const [deleteGoalMutation] = useDeleteGoalMutation();
	const [updateGoalMutation] = useUpdateGoalMutation();
	const [batchUpdateGoals] = useBatchUpdateGoalsMutation();

	const prevGoalsListRef = useRef<IGoalsList[]>(lists);
	const prevStatsRef = useRef<IGoalsStats>({
		all: 0,
		completed: 0,
		percent: 0
	});

	const stats = useMemo(() => {
		if (prevGoalsListRef.current === lists) {
			return prevStatsRef.current;
		}

		const goalsStats = generateGoalsStats(lists);

		prevGoalsListRef.current = lists;
		prevStatsRef.current = goalsStats;
		return prevStatsRef.current;
	}, [lists]);

	// Подписка на обновления в Firestore
	useEffect(() => {
		if (!userId) return;

		const listsRef = collection(db, 'users', userId, 'goalsLists');
		const q = query(listsRef, orderBy('createdAt', 'asc'));

		const unsubscribe = onSnapshot(q, snapshot => {
			const listData = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			})) as IGoalsList[];

			setLists(listData);
		});

		return () => unsubscribe(); // Отписка при размонтировании
	}, [userId]);

	// Добавить новый список
	const addGoalsList = async (title: string) => {
		if (!userId) return null;

		await addGoalsListMutation(title);
	};

	// Удалить список
	const deleteGoalsList = async (listId: string) => {
		if (!userId) return;

		await deleteGoalsListMutation(listId);
	};

	// Переименовать список
	const editTitle = async (listId: string, title: string) => {
		if (!userId) return;

		await renameGoalsListMutation({ listId, title });
	};

	// Функция добавления цели
	const addGoal = async (listId: string, goal: Omit<IGoal, 'id'>) => {
		await addGoalMutation({ listId, goal });
	};
	// Функция удаления цели
	const deleteGoal = async (listId: string, goalId: string) => {
		await deleteGoalMutation({ listId, goalId });
	};

	// Функция обновления цели
	const updateGoal = async (
		listId: string,
		goalId: string,
		goalData: Partial<Omit<IGoal, 'id'>>
	) => {
		await updateGoalMutation({ listId, goalId, goalData });
	};

	// Функция переупорядочивания целей
	const reorderGoals = async (listId: string, goals: IGoal[]) => {
		await batchUpdateGoals({ listId, goals });
	};

	return {
		lists, // goals
		isLoading,
		error,
		addGoalsList,
		deleteGoalsList,
		addGoal,
		deleteGoal,
		updateGoal,
		reorderGoals,
		editTitle,
		stats
	};
};
