import clsx from 'clsx';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IIconCheckbox } from '@/types/ui/icon-checkbox.interface';

import CustomTooltip from '../../Tooltip/Tooltip';

import styles from './icon-checkbox.module.scss';

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
