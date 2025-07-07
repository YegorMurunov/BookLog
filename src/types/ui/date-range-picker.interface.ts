import type { DateRangeProps, Range, RangeKeyDict } from 'react-date-range';

export interface IDateRangePickerProps extends DateRangeProps {
	locale?: Locale;
	onChange?: ((rangesByKey: RangeKeyDict) => void) | undefined;
	ranges?: Range[] | undefined;
	showDateDisplay?: boolean;
	showMonthAndYearPickers?: boolean;

	// onChange?: (date: Date | null) => void; // only when value has changed
	// selected?: Date | null;
	// onSelect?: (date: Date | null) => void; // when day is clicked
	// placeholder?: string;
	// disabled?: boolean;
	// minDate?: Date;
	// maxDate?: Date;
	// className?: string;
	// error?: string;
}

export interface DatepickerFilterComponentProps {
	DefaultPeriod?: number;
}
