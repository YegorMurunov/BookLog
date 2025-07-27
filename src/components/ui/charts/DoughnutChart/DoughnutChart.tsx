import { Chart, type ChartOptions, registerables } from 'chart.js';
import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';

import type { IChartProps } from '@/types/ui/charts.interface';

import styles from './doughnut-chart.module.scss';

Chart.register(...registerables);

const DoughnutChartComponent = ({
	data,
	title,
	className,
	displayLegend = true,
	legendPosition = 'top'
}: IChartProps<'doughnut'>) => {
	const chartRef = useRef<Chart<'doughnut'>>(null);

	// Настройки графика Doughnut
	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		layout: {
			padding: 10
		},
		// cutout: '50%',
		plugins: {
			legend: {
				display: displayLegend,
				position: legendPosition,
				labels: {
					color: '#181818',
					font: {
						family: 'Inter',
						size: 14,
						weight: 'normal'
					}
				}
			},
			title: {
				display: !!title,
				text: title,
				color: '#181818',
				font: { family: 'Inter', size: 20, weight: 'normal' }
			},
			tooltip: {
				backgroundColor: '#fff',
				displayColors: false,
				titleColor: '#181818',
				titleAlign: 'center',
				titleFont: {
					family: 'Inter',
					size: 15,
					weight: 'normal'
				},
				bodyColor: '#181818',
				bodyFont: {
					family: 'Inter',
					size: 14
				},
				borderColor: '#d2d1d1',
				borderWidth: 1,
				padding: 12,
				xAlign: 'center',
				yAlign: 'bottom'
			}
		}
	};

	// Очистка экземпляра графика при размонтировании компонента
	useEffect(() => {
		const chartInstance = chartRef.current;

		return () => {
			if (chartInstance) {
				chartInstance.destroy();
			}
		};
	}, []);

	return (
		<div className={clsx(styles.chartContainer, className)}>
			<Doughnut ref={chartRef} data={data} options={options} title={title} />
		</div>
	);
};

// Мемоизация компонента для предотвращения лишних рендеров
const DoughnutChart = memo(DoughnutChartComponent);

export default DoughnutChart;
