import type { ChartData } from 'chart.js';
import { memo, useMemo } from 'react';

import BarChart from '@/components/ui/charts/BarChart/BarChart';
import { useDashboard } from '@/hooks/useDashboard';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { generateStatusChartData } from '@/utils/generate-dashboard-data';

import styles from './books-chart.module.scss';

const BooksChartComponent = () => {
	const { dashboardBooks } = useDashboard();
	const { filters } = useTypedSelector(state => state.dashboardFilters);

	const { labels, datasets } = useMemo(
		() =>
			generateStatusChartData(
				dashboardBooks,
				filters.dateFrom!,
				filters.dateTo!
			),
		[dashboardBooks, filters.dateFrom, filters.dateTo]
	);

	const customDatasets = datasets.map(ds => ({
		...ds,
		borderRadius: 12
	}));

	const data: ChartData<'bar'> = {
		labels: labels,
		datasets: customDatasets
	};

	return (
		<BarChart
			data={data}
			className={styles.chart}
			legendPosition='bottom'
			displayLegend={false}
		/>
	);
};

const BooksChart = memo(BooksChartComponent);

export default BooksChart;
