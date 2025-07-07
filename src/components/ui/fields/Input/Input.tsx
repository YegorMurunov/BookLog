import clsx from 'clsx';
import { forwardRef, useEffect, useState } from 'react';

import type { IInputProps } from '@/types/ui/fields.interface';

import styles from './input.module.scss';

const Input = forwardRef<HTMLInputElement, IInputProps>(
	(
		{
			name,
			type,
			label,
			className,
			value,
			onChange,
			onBlur,
			error = null,
			disabled,
			...rest
		},
		ref
	) => {
		const [isFocus, setFocus] = useState(false);
		const [isActive, setIsActive] = useState(false);

		useEffect(() => {
			setIsActive(value?.length > 0);
		}, [value]);

		return (
			<label
				htmlFor={name}
				className={clsx(
					styles.label,
					className,
					isFocus && styles.focus,
					isActive && styles.active,
					error && styles.error
				)}
			>
				<span className={styles.title}>{label}</span>
				<input
					ref={ref}
					className={styles.input}
					name={name}
					id={name}
					placeholder=''
					type={type}
					onFocus={() => setFocus(true)}
					onBlur={e => {
						if (onBlur) {
							onBlur(e);
						}
						setFocus(false);
					}}
					value={value}
					disabled={disabled}
					onChange={onChange}
					{...rest}
				/>
				{error && <p className={styles.errorMsg}>{error}</p>}
			</label>
		);
	}
);

export default Input;
