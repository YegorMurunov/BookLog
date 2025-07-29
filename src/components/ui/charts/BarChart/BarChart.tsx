import { Chart, type ChartOptions, registerables } from 'chart.js';
import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import type { IBarChartProps } from '@/types/ui/charts.interface';

import styles from './bar-chart.module.scss';

Chart.register(...registerables);

const BarChartComponent = ({
	data,
	title,
	className,
	displayLegend = true,
	legendPosition = 'top',
	isHorizontal = false
}: IBarChartProps) => {
	const chartRef = useRef<Chart<'bar'>>(null);

	// Настройки графика bar
	const options: ChartOptions<'bar'> = {
		indexAxis: isHorizontal ? 'y' : 'x',
		responsive: true,
		maintainAspectRatio: false,
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
				// title
				titleColor: '#181818',
				titleAlign: 'center',
				titleFont: {
					family: 'Inter',
					size: 15,
					weight: 'normal'
				},
				// body
				bodyColor: '#181818',
				bodyFont: {
					family: 'Inter',
					size: 14
				},
				// border
				borderColor: '#d2d1d1',
				borderWidth: 1,

				padding: 12,
				xAlign: 'center',
				yAlign: 'bottom'
			}
		},
		scales: {
			x: {
				stacked: true,
				grid: {
					display: false
				},
				border: {
					display: false
				},
				ticks: {
					color: '#181818',
					font: {
						family: 'Inter',
						size: 14,
						weight: 'normal'
					}
				}
			},
			y: {
				stacked: true,
				beginAtZero: true,
				grid: {
					display: false
				},
				border: {
					display: false
				},
				ticks: {
					display: false
				}
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
			<Bar ref={chartRef} data={data} options={options} title={title} />
		</div>
	);
};

// Мемоизация компонента для предотвращения лишних рендеров
const BarChart = memo(BarChartComponent);

export default BarChart;
