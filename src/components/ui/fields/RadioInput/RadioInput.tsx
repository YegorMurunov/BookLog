import clsx from 'clsx';

import type { IRadioInputProps } from '@/types/ui/fields.interface';

import styles from './radio-input.module.scss';

export const RadioInput = ({
	label,
	checked,
	onChange,
	name,
	className
}: IRadioInputProps) => {
	return (
		<label
			className={clsx(
				styles.radioLabel,
				className,
				checked && styles.radioLabelSelected
			)}
		>
			<input type='radio' name={name} checked={checked} onChange={onChange} />
			<span>{label}</span>
		</label>
	);
};
