import { ru } from 'date-fns/locale';
import { memo } from 'react';
import { DateRange } from 'react-date-range';

import type { IDateRangePickerProps } from '@/types/ui/date-range-picker.interface';

// custom styles
import './date-range-picker.scss';
// main style file
import 'react-date-range/dist/styles.css';
// theme css file
import 'react-date-range/dist/theme/default.css';

const CustomDateRangePickerComponent = (props: IDateRangePickerProps) => {
	const {
		locale = ru,
		onChange,
		ranges,
		showDateDisplay = false,
		showMonthAndYearPickers = true
	} = props;

	return (
		<DateRange
			{...props}
			locale={locale}
			onChange={onChange}
			ranges={ranges}
			showDateDisplay={showDateDisplay}
			showMonthAndYearPickers={showMonthAndYearPickers}
		/>
	);
};

const CustomDateRangePicker = memo(CustomDateRangePickerComponent);

export default CustomDateRangePicker;
