import {
	batchUpdateGoals,
	firebaseAddGoal,
	firebaseAddGoalsList,
	firebaseDeleteGoal,
	firebaseDeleteGoalsList,
	firebaseGetGoalsLists,
	firebaseRenameGoalsList,
	firebaseUpdateGoal
} from '@/services/firebase/goals';
import type { IGoal, IGoalsList } from '@/types/api/goals.interface';
import { toastWithPromise } from '@/utils/toast.utils';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const goalsApi = createApi({
	reducerPath: 'goalsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['goals'],
	endpoints: builder => ({
		// Получить все списки
		getGoalsLists: builder.query<IGoalsList[], void>({
			async queryFn() {
				try {
					const lists = await firebaseGetGoalsLists();
					return { data: lists };
				} catch (e) {
					return { error: e };
				}
			},
			providesTags: ['goals']
		}),

		// Добавить новый список
		addGoalsList: builder.mutation<IGoalsList, string>({
			async queryFn(title) {
				try {
					await toastWithPromise(() => firebaseAddGoalsList(title), 'addGoal');
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),

		// Удалить список
		deleteGoalsList: builder.mutation<void, string>({
			async queryFn(listId) {
				try {
					await toastWithPromise(
						() => firebaseDeleteGoalsList(listId),
						'deleteGoal'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),

		// Переименовать список
		renameGoalsList: builder.mutation<void, { listId: string; title: string }>({
			async queryFn({ listId, title }) {
				try {
					await toastWithPromise(
						() => firebaseRenameGoalsList(listId, title),
						'editGoalTitle'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),

		// Добавить цель в конкретный список
		addGoal: builder.mutation<
			void,
			{ listId: string; goal: Omit<IGoal, 'id'> }
		>({
			async queryFn({ listId, goal }) {
				try {
					await toastWithPromise(
						() => firebaseAddGoal(listId, goal),
						'addGoal'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),

		// Удалить цель из конкретного списка
		deleteGoal: builder.mutation<void, { listId: string; goalId: string }>({
			async queryFn({ listId, goalId }) {
				try {
					await toastWithPromise(
						() => firebaseDeleteGoal(listId, goalId),
						'deleteGoal'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),

		// Изменить цель в конкретном списке
		updateGoal: builder.mutation<
			void,
			{
				listId: string;
				goalId: string;
				goalData: Partial<Omit<IGoal, 'id'>>;
			}
		>({
			async queryFn({ listId, goalId, goalData }) {
				try {
					await toastWithPromise(
						() => firebaseUpdateGoal(listId, goalId, goalData),
						'editGoal'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),

		// Переупорядочить цели в конкретном списке
		batchUpdateGoals: builder.mutation<
			void,
			{ listId: string; goals: IGoal[] }
		>({
			async queryFn({ listId, goals }) {
				try {
					await toastWithPromise(
						() => batchUpdateGoals(listId, goals),
						'reorderGoals'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		})
	})
});

export const {
	useGetGoalsListsQuery,
	useAddGoalsListMutation,
	useDeleteGoalsListMutation,
	useRenameGoalsListMutation,
	useAddGoalMutation,
	useDeleteGoalMutation,
	useUpdateGoalMutation,
	useBatchUpdateGoalsMutation
} = goalsApi;
