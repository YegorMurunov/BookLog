import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

import { TPlaceTooltip } from './tooltip.interface';

export interface IIconCheckbox
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked'> {
	name: string;
	tooltipTitle: string;
	tooltipDelay?: number;
	tooltipPos?: TPlaceTooltip;
	tooltipId: string;
	className?: string;
	icon: LucideIcon;
	defaultClassname?: string;
	activeClassname?: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}
