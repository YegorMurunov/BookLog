import clsx from 'clsx';
import { Eraser } from 'lucide-react';

import type { ISearchInputProps } from '@/types/ui/fields.interface';

import styles from './search-input.module.scss';

const SearchInput = ({
	name,
	type,
	label,
	className,
	value,
	onChange,
	disabled,
	clearFn,
	...rest
}: ISearchInputProps) => {
	return (
		<label htmlFor={name} className={clsx(styles.label, className)}>
			<input
				className={styles.input}
				name={name}
				id={name}
				placeholder={label}
				type={type}
				disabled={disabled}
				onChange={onChange}
				value={value}
				{...rest}
			/>
			{value && (
				<button className={styles.clearBtn} type='button' onClick={clearFn}>
					<Eraser />
				</button>
			)}
		</label>
	);
};

export default SearchInput;
