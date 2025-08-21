import { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useGoals } from '@/hooks/useGoals';
import type { IGoal } from '@/types/api/goals.interface';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import GoalsItem from './GoalsItem/GoalsItem';

import styles from './goals-list.module.scss';

const GoalsList = () => {
	const { goals, isLoading, reorderGoals } = useGoals();
	const [goalsData, setGoalsData] = useState<IGoal[]>(goals);

	useEffect(() => {
		if (JSON.stringify(goalsData) !== JSON.stringify(goals)) {
			setGoalsData(goals);
		}
	}, [goals]);

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			// local state update
			let newGoals: IGoal[] = [];
			setGoalsData((items: IGoal[]) => {
				const oldIndex = items.findIndex(
					(item: IGoal) => item.id === active.id
				);
				const newIndex = items.findIndex((item: IGoal) => item.id === over.id);

				newGoals = arrayMove(items, oldIndex, newIndex).map((goal, index) => ({
					...goal,
					index // Update index for each goal
				}));

				return newGoals;
			});

			try {
				// Update on server
				await reorderGoals(newGoals);
			} catch (error) {
				console.error('Failed to update goals on server:', error);
				// cancel local state, if catch the error
				setGoalsData(goals);
			}
		}
	};

	const goalsItems = useMemo(() => {
		return (
			<DndContext
				modifiers={[restrictToVerticalAxis]}
				onDragEnd={handleDragEnd}
			>
				<SortableContext items={goalsData.map(goal => goal.id)}>
					{goalsData.map(goal => (
						<GoalsItem goal={goal} key={goal.id} />
					))}
				</SortableContext>
			</DndContext>
		);
	}, [goalsData]);

	return (
		<div className={styles.goalsList}>
			<ul className={styles.goalsList__ul}>
				{isLoading
					? [...Array(5)].map((_, i) => (
							<div className='flex justify-between items-center w-full' key={i}>
								<div className='flex gap-2 items-center'>
									<Skeleton width={20} height={20} className='mr-1' />
									<Skeleton height={20} className='w-[200px] md:w-[300px]' />
								</div>
								<Skeleton width={20} height={20} />
							</div>
						))
					: goalsItems}
			</ul>
		</div>
	);
};

export default GoalsList;
