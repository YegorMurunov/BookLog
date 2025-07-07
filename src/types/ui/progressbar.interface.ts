import type { ReactNode } from 'react';

export interface IProgressbarProps {
	value: number; // Progress value (0-100)
	text?: string; // Optional text to display inside the progress bar
	className?: string; // Optional class name for custom styling
}

export interface IProgressbarWidgetProps {
	value: number; // Progress value (0-100)
	children?: ReactNode; // Optional children to render inside the widget
	className?: string; // Optional class name for custom styling
}
