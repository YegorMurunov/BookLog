import {
	ChangeEvent,
	InputHTMLAttributes,
	TextareaHTMLAttributes
} from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	type: string;
	label: string;
	className?: string;
	error?: string | null;
	value: string;
	disabled?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ISearchInputProps extends IInputProps {
	clearFn: () => void;
}

export interface ITextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	placeholder: string;
	className?: string;
	error?: string | null;
	value: string;
	disabled?: boolean;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
