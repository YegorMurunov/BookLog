export interface IDatepickerProps {
	selected?: Date | null;
	onSelect?: (date: Date | null) => void; // when day is clicked
	onChange: (date: Date | null) => void; // only when value has changed
	placeholder?: string;
	disabled?: boolean;
	minDate?: Date;
	maxDate?: Date;
	className?: string;
	error?: string;
}
