import { LucideIcon } from 'lucide-react';

export interface IDropdownProps {
	title: string;
	icon: LucideIcon;
	items: { label: string; value: string }[];
	counts?: { value: string; count: number }[];
	activeIndex: number;
	onSelect: (index: number) => void;
	className?: string;
}
