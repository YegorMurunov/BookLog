import clsx from 'clsx';

import { IButtonWithIconProps } from '@/types/ui/button.interface';

import styles from './button-with-icon.module.scss';

export const ButtonWithIcon = ({
	type,
	className,
	title,
	colorTheme = 'default',
	icon: Icon,
	...rest
}: IButtonWithIconProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				colorTheme === 'default' ? '' : styles[colorTheme],
				className
			)}
			type={type}
			{...rest}
		>
			<span className={styles.title}>{title}</span>
			<div className={styles.icon}>
				<Icon />
			</div>
		</button>
	);
};
