import type { ChartData } from 'chart.js';
import { memo, useMemo } from 'react';

import PolarAreaChart from '@/components/ui/charts/PolarAreaChart/PolarAreaChart';
import { useDashboard } from '@/hooks/useDashboard';
import { generateGenresData } from '@/utils/generate-dashboard-data';

import styles from './genres-chart.module.scss';

const GenresChartComponent = () => {
	const { dashboardBooks } = useDashboard();
	const { dataNumbers, labels, backgroundColor } = useMemo(
		() => generateGenresData(dashboardBooks),
		[dashboardBooks]
	);

	// Данные для графика PolarArea
	const data: ChartData<'polarArea'> = {
		labels: labels,
		datasets: [
			{
				label: ' Количество книг',
				data: dataNumbers,
				backgroundColor: backgroundColor,
				borderColor: 'rgba(255, 255, 255, 0.2)',
				hoverBorderColor: '#d2d1d1'
			}
		]
	};

	return (
		<PolarAreaChart
			data={data}
			title='Жанры'
			className={styles.chart}
			legendPosition='right'
		/>
	);
};

const GenresChart = memo(GenresChartComponent);

export default GenresChart;
