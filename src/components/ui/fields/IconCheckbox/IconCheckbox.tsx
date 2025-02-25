import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { TPlaceTooltip } from '@/types/ui/tooltip.interface';

import CustomTooltip from '../../Tooltip/Tooltip';

import styles from './icon-checkbox.module.scss';

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

const IconCheckbox = ({
	name,
	tooltipTitle,
	tooltipDelay = 0,
	tooltipPos = 'top',
	tooltipId,
	className,
	icon: Icon,
	defaultClassname,
	activeClassname = styles.active,
	checked = false,
	onChange,
	...rest
}: IIconCheckbox) => {
	const { isMobile, isTablet } = useTypedSelector(state => state.sidebar);

	return (
		<label htmlFor={name} className={clsx(styles.label, className)}>
			{!isMobile && !isTablet && (
				<CustomTooltip
					id={tooltipId}
					place={tooltipPos}
					title={tooltipTitle}
					delay={tooltipDelay}
				/>
			)}
			<i
				className={clsx(
					styles.icon,
					defaultClassname,
					checked && activeClassname
				)}
				id={tooltipId}
			>
				<Icon />
			</i>
			<input
				type='checkbox'
				checked={checked}
				className={styles.input}
				onChange={e => onChange && onChange(e.target.checked)}
				name={name}
				id={name}
				{...rest}
			/>
		</label>
	);
};

export default IconCheckbox;
