import GoalsForm from './GoalsForm/GoalsForm';
import GoalsList from './GoalsList/GoalsList';
import GoalsTitle from './GoalsTitle/GoalsTitle';

import styles from './goals-content.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const GoalsContent = () => {
	return (
		<section className={styles.content}>
			<div className={styles.goals}>
				<div className={styles.goals__item}>
					<GoalsTitle />
					<GoalsForm />
					<GoalsList />
				</div>
			</div>
		</section>
	);
};

export default GoalsContent;
