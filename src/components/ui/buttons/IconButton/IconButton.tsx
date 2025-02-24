import clsx from 'clsx';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IIconButton } from '@/types/ui/button.interface';

import CustomTooltip from '../../Tooltip/Tooltip';

import styles from './icon-button.module.scss';

export const IconButton = ({
	type,
	className,
	title,
	colorTheme = 'default',
	icon: Icon,
	tooltipPos,
	...rest
}: IIconButton) => {
	const { isMobile, isTablet } = useTypedSelector(state => state.sidebar);

	return (
		<button
			className={clsx(
				styles.button,
				colorTheme === 'default' ? '' : styles[colorTheme],
				className
			)}
			id='button-add'
			type={type}
			{...rest}
		>
			{!isMobile && !isTablet && (
				<CustomTooltip
					id='button-add'
					place={tooltipPos}
					title={title}
					delay={300}
				/>
			)}
			<div className={styles.icon}>
				<Icon />
			</div>
		</button>
	);
};
