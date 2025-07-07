import type { Control, FieldValues } from 'react-hook-form';

export interface IOptions {
	value: string;
	label: string;
	color?: string;
}

export interface ICustomSelectProps {
	options: IOptions[];
	placeholder?: string;
	isMulti?: boolean;
	isLoading?: boolean;
	isSearchable?: boolean;
	isCreatable?: boolean;
	isDisabled?: boolean;
	isClearable?: boolean;
	defaultValue?: string;
	error?: string | null;
	className?: string;
	onChange?: (value: IOptions | IOptions[] | null) => void;
	isMenuRelative?: boolean;
}

export interface DashboardFilterSelectProps<T extends FieldValues> {
	control: Control<T>;
	name: keyof T;
	options: IOptions[];
	placeholder?: string;
	isMulti?: boolean;
	isClearable?: boolean;
	isSearchable?: boolean;
}
