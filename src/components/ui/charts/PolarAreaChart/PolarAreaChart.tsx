import { Chart, type ChartOptions, registerables } from 'chart.js';
import clsx from 'clsx';
import { memo, useEffect, useRef } from 'react';
import { PolarArea } from 'react-chartjs-2';

import type { IChartProps } from '@/types/ui/charts.interface';

import styles from './polar-area-chart.module.scss';

Chart.register(...registerables);

const PolarAreaChartComponent = ({
	data,
	title,
	className,
	legendPosition = 'top'
}: IChartProps<'polarArea'>) => {
	const chartRef = useRef<Chart<'polarArea'>>(null);

	// Настройки графика PolarArea
	const options: ChartOptions<'polarArea'> = {
		plugins: {
			legend: {
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
				backgroundColor: 'rgba(0,0,0,0.8)',
				titleColor: '#fff',
				bodyColor: '#fff',
				borderColor: '#333',
				borderWidth: 1,
				titleFont: {
					family: 'Inter'
				},
				bodyFont: {
					family: 'Inter'
				}
			}
		},
		scales: {
			r: {
				ticks: {
					color: '#181818',
					stepSize: 1,
					font: {
						family: 'Inter',
						size: 12,
						weight: 'normal'
					}
				},
				pointLabels: {
					font: {
						family: 'Inter',
						size: 14,
						weight: 'bold'
					},
					color: '#181818'
				}
			}
		},
		datasets: {
			polarArea: {}
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
			<PolarArea ref={chartRef} data={data} options={options} title={title} />
		</div>
	);
};

// Мемоизация компонента для предотвращения лишних рендеров
const PolarAreaChart = memo(PolarAreaChartComponent);

export default PolarAreaChart;
