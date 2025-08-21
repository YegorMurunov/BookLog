import { format } from 'date-fns';

import {
	firebaseAddAchievement,
	firebaseDeleteAchievement,
	firebaseGetAchievements,
	firebaseUpdateAchievement
} from '@/services/firebase/achievements';
import type { IAchievement } from '@/types/api/achievements.interface';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const achievementsApi = createApi({
	reducerPath: 'achievementsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['achievements'],
	endpoints: builder => ({
		getAchievements: builder.query<Omit<IAchievement[], 'check'>, void>({
			async queryFn() {
				try {
					const achievements = await firebaseGetAchievements();
					return { data: achievements };
				} catch (e) {
					console.error(e);
					return { error: e };
				}
			},
			providesTags: ['achievements']
		}),
		addAchievement: builder.mutation<void, Omit<IAchievement, 'check'>>({
			async queryFn(achievement) {
				try {
					await firebaseAddAchievement({
						id: achievement.id,
						title: achievement.title,
						description: achievement.description,
						icon: achievement.icon,
						isEarned: true,
						earnedAt: format(new Date(), 'yyyy-MM-dd')
					});
					return { data: undefined };
				} catch (e) {
					console.error(e);
					return { error: e };
				}
			},
			invalidatesTags: ['achievements']
		}),
		deleteAchievement: builder.mutation<void, string>({
			async queryFn(achievementId) {
				try {
					await firebaseDeleteAchievement(achievementId);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['achievements']
		}),
		updateAchievement: builder.mutation<
			void,
			{
				achievementId: string;
				achievementData: Omit<IAchievement, 'id' | 'check'>;
			}
		>({
			async queryFn({ achievementId, achievementData }) {
				try {
					await firebaseUpdateAchievement(achievementId, achievementData);
					return { data: undefined };
				} catch (e) {
					return { error: e };
				}
			},
			invalidatesTags: ['achievements']
		})
	})
});

export const {
	useGetAchievementsQuery,
	useAddAchievementMutation,
	useDeleteAchievementMutation,
	useUpdateAchievementMutation
} = achievementsApi;
