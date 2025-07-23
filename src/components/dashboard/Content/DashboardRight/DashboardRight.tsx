import { memo } from 'react';

import ProgressbarWidget from '@/components/ui/ProgressbarWidget/ProgressbarWidget';
import QuoteCard from '@/components/ui/Quote/Quote';
import { useGoals } from '@/hooks/useGoals';
import getQuote from '@/utils/get-quote';

const DashboardRightComponent = () => {
	const { stats } = useGoals();

	const { all, completed } = stats;
	const value = stats.percent;

	const { author, quote } = getQuote(value);

	return (
		<ProgressbarWidget vertical={true} value={value} title='Цели'>
			<div>
				<p>
					Выполнено {completed} из {all} целей
				</p>
				<QuoteCard author={author} quote={quote} className='mt-5' />
			</div>
		</ProgressbarWidget>
	);
};

const DashboardRight = memo(DashboardRightComponent);

export default DashboardRight;
