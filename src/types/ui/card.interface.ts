export interface ICardProps {
	title: string;
	mainValue: number;
	subtext: string;
	subtextValue?: string;
	className?: string;
	tooltipText?: string;
	index?: number;
}

export interface ICardInfo {
	title: string;
	index: number;
}
