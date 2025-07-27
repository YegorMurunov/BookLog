import type { ChartData } from 'chart.js';
import { memo, useMemo } from 'react';

import DoughnutChart from '@/components/ui/charts/DoughnutChart/DoughnutChart';
import { useDashboard } from '@/hooks/useDashboard';
import { generateAuthorsData } from '@/utils/generate-dashboard-data';

import styles from './authors-chart.module.scss';

const AuthorsChartComponent = () => {
	const { dashboardBooks } = useDashboard();
	const {
		data: authorsData,
		labels,
		backgroundColor
	} = useMemo(() => generateAuthorsData(dashboardBooks), [dashboardBooks]);

	// Данные для графика Pie
	const data: ChartData<'doughnut'> = {
		labels: labels,
		datasets: [
			{
				label: ' Количество книг',
				data: authorsData,
				backgroundColor: backgroundColor,
				borderColor: 'rgba(255, 255, 255, 0.2)',
				hoverBorderColor: '#d2d1d1',
				hoverOffset: 20
			}
		]
	};

	return (
		<DoughnutChart
			data={data}
			className={styles.chart}
			legendPosition='right'
			title='Авторы'
		/>
	);
};

const AuthorsChart = memo(AuthorsChartComponent);

export default AuthorsChart;
