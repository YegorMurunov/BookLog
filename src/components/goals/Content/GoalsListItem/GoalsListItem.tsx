import { memo } from 'react';

import type { GoalsListItemProps } from '@/types/api/goals.interface';

import GoalsForm from './GoalsForm/GoalsForm';
import GoalsList from './GoalsList/GoalsList';
import ListTitle from './ListTitle/ListTitle';

import styles from '../goals-content.module.scss';

const GoalsListItemComponent = ({ list }: GoalsListItemProps) => {
	return (
		<div className={styles.listItem}>
			<ListTitle list={list} />
			<GoalsForm list={list} />
			<GoalsList list={list} />
		</div>
	);
};

export const GoalsListItem = memo(GoalsListItemComponent);

export default GoalsListItem;
