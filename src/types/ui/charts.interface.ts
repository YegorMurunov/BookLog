import type { ChartData, ChartType } from 'chart.js';

// chart.js
export interface IChartProps<TType extends ChartType> {
	data: ChartData<TType>;
	// options?: ChartOptions<TType>;
	className?: string;
	title?: string;
	legendPosition?: 'top' | 'bottom' | 'left' | 'right';
	displayLegend?: boolean;
}

// export interface IPolarAreaProps extends IChartProps<'polarArea'> {}

export interface IBarChartProps extends IChartProps<'bar'> {
	isHorizontal?: boolean;
}
