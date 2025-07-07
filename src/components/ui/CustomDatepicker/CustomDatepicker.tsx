import clsx from 'clsx';
import ru from 'date-fns/locale/ru';
import { memo } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import type { IDatepickerProps } from '@/types/ui/datepicker.interface';

import './datepicker.scss';
import 'react-datepicker/dist/react-datepicker.css';

// Регистрируем русскую локализацию
registerLocale('ru', ru);

const CustomDatepickerComponent = ({
	selected = null,
	onChange,
	onSelect,
	placeholder = 'Выберите дату',
	disabled = false,
	minDate,
	maxDate,
	className,
	error = ''
}: IDatepickerProps) => {
	return (
		<div className={clsx('datepicker-wrapper', className)}>
			<DatePicker
				selected={selected}
				onChange={onChange}
				onSelect={onSelect}
				locale='ru'
				dateFormat='dd/MM/yyyy'
				placeholderText={placeholder}
				disabled={disabled}
				minDate={minDate}
				maxDate={maxDate}
				className={clsx('custom-datepicker', { error: error })}
				popperPlacement='top'
			/>
			{error && <p className='errorMsg'>{error}</p>}
		</div>
	);
};

const CustomDatepicker = memo(CustomDatepickerComponent);

export default CustomDatepicker;
