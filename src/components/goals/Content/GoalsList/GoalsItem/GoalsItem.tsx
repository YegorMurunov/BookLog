import clsx from 'clsx';
import { GripVertical, Square, SquareCheckBig, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useActions } from '@/hooks/useActions';
import { useGoals } from '@/hooks/useGoals';
import type { IGoal, IGoalsItemProps } from '@/types/api/goals.interface';
import type { IDeleteModal } from '@/types/ui/delete-modal.interface';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from '../goals-list.module.scss';

const GoalsItem = ({ goal }: IGoalsItemProps) => {
	const { updateGoal } = useGoals();
	const { openDeleteModal } = useActions();

	const modalData: Omit<IDeleteModal, 'isOpen'> = {
		id: goal.id,
		typeOfObject: 'goals'
	};

	const [isDisabled, setIsDisabled] = useState(false);

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: goal.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	const editGoal = async () => {
		if (isDisabled) return;
		setIsDisabled(true);
		try {
			const goalData: IGoal = {
				...goal,
				isCompleted: !goal.isCompleted
			};
			await updateGoal(goal.id, goalData);
		} catch (error) {
			console.error('Error to edit goal:', error);
		} finally {
			setIsDisabled(false);
		}
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			className={clsx(styles.goalsList__item, isDisabled && styles.disabled)}
			key={goal.id}
		>
			<button type='button' onClick={editGoal} className={styles.btnCheck}>
				{goal.isCompleted ? <SquareCheckBig /> : <Square />}
				<span
					className={clsx(styles.title, goal.isCompleted && styles.completed)}
				>
					{goal.title}
				</span>
			</button>
			<button
				type='button'
				className={styles.btnDelete}
				onClick={() => openDeleteModal(modalData)}
			>
				<Trash2 />
			</button>
			<button {...attributes} {...listeners} className={styles.btnMove}>
				<GripVertical />
			</button>
		</li>
	);
};

export default GoalsItem;
