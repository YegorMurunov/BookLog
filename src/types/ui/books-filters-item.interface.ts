export interface IBooksFiltersItemProps {
	value: string;
	label: string;
	isSelected: boolean;
	count?: number;
	handleClick: () => void;
}
