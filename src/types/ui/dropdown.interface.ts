import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface IDropdownProps {
	title: string;
	icon: LucideIcon;
	className?: string;
	dropdownContentClassName?: string;
	children: (close: () => void) => ReactNode;
}
