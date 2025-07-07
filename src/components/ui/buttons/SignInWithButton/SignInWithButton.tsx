import clsx from 'clsx';

import type { ISignInWithButtonProps } from '@/types/ui/button.interface';

import styles from './sign-in-with-button.module.scss';

export const SignInWithButton = ({
	className,
	title,
	colorTheme = 'light',
	iconPath,
	animate = false,
	...rest
}: ISignInWithButtonProps) => {
	return (
		<button
			className={clsx(
				styles.button,
				className,
				colorTheme,
				animate && styles.animate
			)}
			type='button'
			{...rest}
		>
			<div className={styles.icon}>
				<img src={iconPath} alt={title} />
			</div>
			<span className={styles.title}>{title}</span>
		</button>
	);
};
