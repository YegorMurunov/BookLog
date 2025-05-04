import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query
} from 'firebase/firestore';
import { useEffect, useMemo, useRef, useState } from 'react';

import { db } from '@/services/firebase/firebase';
import {
	useAddGoalMutation,
	useBatchUpdateGoalsMutation,
	useDeleteGoalMutation,
	useEditTitleMutation,
	useGetGoalsQuery,
	useGetTitleQuery,
	useUpdateGoalMutation
} from '@/store/api/goals-api';
import {
	IGoal,
	IGoalsListTitle,
	IGoalsStats
} from '@/types/ui/goals.interface';
import { generateGoalsStats } from '@/utils/genetate-goals-stats';

import { useAuth } from './useAuth';

export const useGoals = () => {
	const { userData } = useAuth();
	const userId = userData.user?.uid;

	// Получение целей
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

	// goals list title
	const {
		data: cachedTitle,
		isLoading: isLoadingTitle,
		error: errorTitle,
		refetch: refetchTitle
	} = useGetTitleQuery(undefined, {
		skip: !userId
	});

	const goalsTitle = cachedTitle?.title || 'Цели на год';

	const [editTitle] = useEditTitleMutation();

	const prevGoalsRef = useRef<IGoal[]>(goals);
	const prevStatsRef = useRef<IGoalsStats>({
		all: 0,
		completed: 0,
		percent: 0
	});

	const stats = useMemo(() => {
		if (prevGoalsRef.current === goals) {
			return prevStatsRef.current;
		}

		const goalsStats = generateGoalsStats(goals);

		prevGoalsRef.current = goals;
		prevStatsRef.current = goalsStats;
		return prevStatsRef.current;
	}, [goals]);

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

	// Подписка на обновления в Firestore
	useEffect(() => {
		if (!userId) return;

		const titleDoc = doc(db, 'users', userId, 'goalsMeta', 'title');

		const unsubscribe = onSnapshot(titleDoc, () => {
			refetchTitle(); // обновляем заголовок
		});

		return () => unsubscribe();
	}, [userId, refetchTitle]);

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

	// Функция для изменения названия списка целей
	const editGoalsTitle = async (data: IGoalsListTitle) => {
		await editTitle(data.title);
	};

	return {
		goals,
		isLoading,
		error,
		addGoal,
		deleteGoal,
		updateGoal,
		reorderGoals,
		editGoalsTitle,
		goalsTitle,
		isLoadingTitle,
		errorTitle,
		stats
	};
};
