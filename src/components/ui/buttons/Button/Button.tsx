import clsx from 'clsx';

import { IButtonProps } from '@/types/ui/button.interface';

import styles from './button.module.scss';

export const Button = ({
	type,
	className,
	title,
	colorTheme = 'default',
	variant = 'default',
	...rest
}: IButtonProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				className,
				colorTheme === 'default' ? '' : styles[colorTheme],
				variant === 'default' ? '' : styles[variant]
			)}
			type={type}
			{...rest}
		>
			{title}
		</button>
	);
};
