import ProgressbarWidget from '@/components/ui/ProgressbarWidget/ProgressbarWidget';
import QuoteCard from '@/components/ui/Quote/Quote';
import { useGoals } from '@/hooks/useGoals';
import getQuote from '@/utils/get-quote';

import GoalsListItem from './GoalsListItem/GoalsListItem';

import styles from './goals-content.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const GoalsContent = () => {
	const { stats, lists, addGoalsList } = useGoals();

	const { all, completed } = stats;
	const value = stats.percent;

	const { author, quote } = getQuote(value);

	return (
		<section className={styles.content}>
			<div className={styles.goals}>
				<div className={styles.goals__item}>
					{lists.map(list => (
						<GoalsListItem list={list} key={list.id} />
					))}
					<button
						onClick={() => addGoalsList('Новый список')}
						className={styles.addButton}
					>
						Создать список
					</button>
				</div>
				<div className={styles.goals__item}>
					<ProgressbarWidget value={value} title='Прогресс' className='mt-8'>
						<div>
							<p>
								Выполнено {completed} из {all} целей
							</p>
							<QuoteCard author={author} quote={quote} className='mt-5' />
						</div>
					</ProgressbarWidget>
				</div>
			</div>
		</section>
	);
};

export default GoalsContent;
