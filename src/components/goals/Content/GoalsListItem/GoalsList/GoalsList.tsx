import { memo, useEffect, useMemo, useState } from 'react';

import { useGoals } from '@/hooks/useGoals';
import type { GoalsListItemProps, IGoal } from '@/types/api/goals.interface';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';

import GoalsItem from './GoalsItem/GoalsItem';

import styles from './goals-list.module.scss';

const GoalsListComponent = ({ list }: GoalsListItemProps) => {
	const listId = list.id;

	const { reorderGoals } = useGoals();
	const [goalsData, setGoalsData] = useState<IGoal[]>(list.goals || []);

	useEffect(() => {
		if (JSON.stringify(goalsData) !== JSON.stringify(list.goals || [])) {
			setGoalsData(list.goals || []);
		}
	}, [list.goals]);

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
				await reorderGoals(listId, newGoals);
			} catch (error) {
				console.error('Failed to update goals on server:', error);
				// cancel local state, if catch the error
				setGoalsData(list.goals);
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
						<GoalsItem key={goal.id} goal={goal} listId={listId} />
					))}
				</SortableContext>
			</DndContext>
		);
	}, [goalsData]);

	return (
		<div className={styles.goalsList}>
			<ul className={styles.goalsList__ul}>{goalsItems}</ul>
		</div>
	);
};

const GoalsList = memo(GoalsListComponent);
export default GoalsList;
