import {
	batchUpdateGoals,
	firebaseAddGoal,
	firebaseDeleteGoal,
	firebaseGetGoals,
	firebaseUpdateGoal
} from '@/services/firebase/goals';
import { IGoal } from '@/types/ui/goals.interface';
import { toastWithPromise } from '@/utils/toast.utils';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const goalsApi = createApi({
	reducerPath: 'goalsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['goals'],
	endpoints: builder => ({
		getGoals: builder.query<IGoal[], void>({
			async queryFn() {
				try {
					const goals = await firebaseGetGoals();
					return { data: goals };
				} catch (e) {
					return { error: e };
				}
			},
			providesTags: ['goals']
		}),
		addGoal: builder.mutation<void, Omit<IGoal, 'id'>>({
			async queryFn(goal) {
				try {
					await toastWithPromise(() => firebaseAddGoal(goal), 'addGoal');
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),
		deleteGoal: builder.mutation<void, string>({
			async queryFn(goalId) {
				try {
					await toastWithPromise(
						() => firebaseDeleteGoal(goalId),
						'deleteGoal'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),
		updateGoal: builder.mutation<
			void,
			{
				goalId: string;
				goalData: Partial<Omit<IGoal, 'id'>>;
			}
		>({
			async queryFn({ goalId, goalData }) {
				try {
					await toastWithPromise(
						() => firebaseUpdateGoal(goalId, goalData),
						'editGoal'
					);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['goals']
		}),
		batchUpdateGoals: builder.mutation<void, IGoal[]>({
			async queryFn(goals) {
				try {
					await toastWithPromise(() => batchUpdateGoals(goals), 'reorderGoals');
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
	useGetGoalsQuery,
	useAddGoalMutation,
	useDeleteGoalMutation,
	useUpdateGoalMutation,
	useBatchUpdateGoalsMutation
} = goalsApi;
