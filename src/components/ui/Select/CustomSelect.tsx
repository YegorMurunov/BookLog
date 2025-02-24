import clsx from 'clsx';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import Select, {
	GroupBase,
	MultiValue,
	OnChangeValue,
	SingleValue,
	StylesConfig
} from 'react-select';
import makeAnimated from 'react-select/animated';

import {
	ICustomSelectProps,
	IOptions
} from '@/types/ui/custom-select.interface';

import './custom-select.scss';

// Wrap CustomSelect with forwardRef
const CustomSelect = forwardRef<any, ICustomSelectProps>(
	(
		{
			options,
			placeholder,
			isMulti,
			isSearchable = false,
			isLoading,
			isClearable,
			isDisabled,
			defaultValue,
			onChange,
			error,
			className,
			...rest
		},
		ref // Ref passed from Controller
	) => {
		const [currentValue, setValue] = useState<IOptions | IOptions[] | null>(
			isMulti ? [] : options.find(item => item.value === defaultValue) || null
		);

		const animatedComponents = useMemo(() => makeAnimated(), []);

		const handleChange = useCallback(
			(newValue: OnChangeValue<IOptions, boolean>) => {
				if (isMulti) {
					setValue((newValue as MultiValue<IOptions>).slice());
				} else {
					setValue(newValue as SingleValue<IOptions>);
				}
				if (onChange) {
					onChange(newValue as IOptions | IOptions[] | null);
				}
			},
			[isMulti, onChange]
		);

		return (
			<>
				<Select
					ref={ref} // Forward the ref to react-select
					value={currentValue}
					onChange={handleChange}
					options={options}
					placeholder={placeholder}
					isMulti={isMulti}
					isSearchable={isSearchable}
					isLoading={isLoading}
					isClearable={isClearable}
					isDisabled={isDisabled}
					className={clsx(
						'custom-select-container',
						className,
						error && 'select-error'
					)}
					classNamePrefix='custom-select'
					components={animatedComponents}
					styles={customStyles}
					formatOptionLabel={formatOptionLabel}
					{...rest}
				/>
				{error && <p className='errorMsg'>{error}</p>}
			</>
		);
	}
);

// Add displayName for better debugging (optional but recommended)
CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;

const customStyles: StylesConfig<IOptions, boolean, GroupBase<IOptions>> = {
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused
			? state.data.color || 'rgba(200, 200, 200, 0.3)'
			: 'transparent',
		color: state.isSelected ? '#fff' : '#181818',
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		padding: '8px',
		transition: 'background-color 0.3s ease',
		':active': {
			backgroundColor: state.data.color || 'rgba(150, 150, 150, 0.5)'
		}
	}),
	singleValue: provided => ({
		...provided,
		display: 'flex',
		alignItems: 'center',
		gap: '8px'
	})
};

const formatOptionLabel = (option: IOptions) => (
	<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
		{option.color && (
			<span
				style={{
					display: 'inline-block',
					width: '12px',
					height: '12px',
					borderRadius: '50%',
					backgroundColor: option.color
				}}
			></span>
		)}
		{option.label}
	</div>
);
