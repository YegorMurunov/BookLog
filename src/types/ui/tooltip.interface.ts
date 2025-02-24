export type TPlaceTooltip =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'right'
	| 'right-start'
	| 'right-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end';

export interface ITooltipProps {
	id: string;
	title: string;
	place: TPlaceTooltip;
	delay?: number;
}
