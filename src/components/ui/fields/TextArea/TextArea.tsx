import clsx from 'clsx';
import { forwardRef } from 'react';

import type { ITextareaProps } from '@/types/ui/fields.interface';

import styles from './textarea.module.scss';

const TextArea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
	({ name, className, onChange, placeholder, error = null, ...rest }, ref) => {
		return (
			<label
				htmlFor={name}
				className={clsx(styles.label, className, error && styles.error)}
			>
				<textarea
					ref={ref}
					className={styles.textarea}
					name={name}
					id={name}
					placeholder={placeholder}
					onChange={onChange}
					{...rest}
				/>
				{error && <p className={styles.errorMsg}>{error}</p>}
			</label>
		);
	}
);

export default TextArea;
