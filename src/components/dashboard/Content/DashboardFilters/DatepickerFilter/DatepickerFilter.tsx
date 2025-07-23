import clsx from 'clsx';
import { isEqual, startOfDay, startOfYear, subDays } from 'date-fns';
import { Calendar1 } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import type { Range, RangeKeyDict } from 'react-date-range';
import { useDebouncedCallback } from 'use-debounce';

import CustomDateRangePicker from '@/components/ui/CustomDateRangePicker/CustomDateRangePicker';
import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { PREDEFINED_PERIODS } from '@/configs/date';
import { useDashboard } from '@/hooks/useDashboard';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import type { IDashboardFilters } from '@/types/api/dashboard.interface';
import type { DatepickerFilterComponentProps } from '@/types/ui/date-range-picker.interface';
import { calcDefaultPeriod } from '@/utils/dashboard-filters.utils';
import { declOfNum, diffInDays } from '@/utils/formate-date.utils';

import { DateRangeRadioGroup } from './DateRangeRadioGroup/DateRangeRadioGroup';

import styles from './datepicker-filter.module.scss';

const DatepickerFilterComponent = ({
	DefaultPeriod = 30
}: DatepickerFilterComponentProps) => {
	const { updateDashboardFilters } = useDashboard();
	const { filters } = useTypedSelector(state => state.dashboardFilters);

	const initialPeriod = useMemo(() => calcDefaultPeriod(filters), [filters]);

	const [selectedPeriod, setSelectedPeriod] = useState<number | null>(
		initialPeriod
	);

	const initialDateRange: Range[] = useMemo(() => {
		const endDate = new Date();
		const startDate =
			initialPeriod === -1
				? startOfYear(endDate)
				: subDays(endDate, initialPeriod - 1);

		return [{ startDate, endDate, key: 'selection' }];
	}, [initialPeriod]);

	const [valueDateRangePicker, setValueDateRangePicker] =
		useState<Range[]>(initialDateRange);

	const debouncedUpdateFilters = useDebouncedCallback(
		(newFilters: Partial<IDashboardFilters>) => {
			updateDashboardFilters({
				genres: newFilters.genres ?? filters.genres,
				status: newFilters.status ?? filters.status,
				dateFrom: newFilters.dateFrom ?? filters.dateFrom,
				dateTo: newFilters.dateTo ?? filters.dateTo,
				rating: newFilters.rating ?? filters.rating
			});
		},
		300,
		{ leading: false, trailing: true }
	);

	const handleDateRangeChange = useCallback(
		(ranges: RangeKeyDict) => {
			const { selection } = ranges;
			if (selection.startDate && selection.endDate) {
				setValueDateRangePicker([selection]);

				const matchedPeriod = PREDEFINED_PERIODS.find(period => {
					if (period.days === -1) {
						const expectedStart = startOfYear(new Date());
						return (
							isEqual(startOfDay(selection.startDate!), expectedStart) &&
							isEqual(startOfDay(selection.endDate!), startOfDay(new Date()))
						);
					}

					const expectedStart = startOfDay(
						subDays(new Date(), period.days - 1)
					);
					return (
						isEqual(startOfDay(selection.startDate!), expectedStart) &&
						isEqual(startOfDay(selection.endDate!), startOfDay(new Date()))
					);
				});

				setSelectedPeriod(matchedPeriod?.days || null);

				debouncedUpdateFilters({
					dateFrom: selection.startDate.toISOString().slice(0, 10),
					dateTo: selection.endDate.toISOString().slice(0, 10)
				});
			}
		},
		[debouncedUpdateFilters]
	);

	const handleSelectPeriod = useCallback(
		(days: number) => {
			const endDate = new Date();
			const startDate =
				days === -1 ? startOfYear(endDate) : subDays(endDate, days - 1);

			setValueDateRangePicker([{ startDate, endDate, key: 'selection' }]);
			setSelectedPeriod(days);

			debouncedUpdateFilters({
				dateFrom: startDate.toISOString().slice(0, 10),
				dateTo: endDate.toISOString().slice(0, 10)
			});
		},
		[debouncedUpdateFilters]
	);

	const dropdownTitle = useMemo(() => {
		if (selectedPeriod) {
			return (
				PREDEFINED_PERIODS.find(p => p.days === selectedPeriod)?.label ??
				`${DefaultPeriod} дней`
			);
		}

		const startDate = valueDateRangePicker[0]?.startDate;
		const endDate = valueDateRangePicker[0]?.endDate;

		if (startDate && endDate) {
			const days = diffInDays(startDate, endDate);
			return `${days} ${declOfNum(days, ['день', 'дня', 'дней'])}`;
		}

		return 'Период';
	}, [selectedPeriod, DefaultPeriod, valueDateRangePicker]);

	return (
		<Dropdown
			icon={Calendar1}
			title={dropdownTitle}
			dropdownContentClassName={clsx(
				styles.dropdownContent,
				styles.dropdownContent__date
			)}
		>
			{() => (
				<div className={styles.daterangeContent}>
					<p className={styles.filter__title}>Выберите период:</p>

					<DateRangeRadioGroup
						selectedPeriod={selectedPeriod}
						onSelectPeriod={handleSelectPeriod}
					/>

					<div className={styles.datepicker}>
						<CustomDateRangePicker
							showDateDisplay={true}
							maxDate={new Date()}
							ranges={valueDateRangePicker}
							onChange={handleDateRangeChange}
							showPreview={true}
						/>
					</div>
				</div>
			)}
		</Dropdown>
	);
};

export const DatepickerFilter = memo(DatepickerFilterComponent);
