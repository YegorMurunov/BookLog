import { RadioInput } from '@/components/ui/fields/RadioInput/RadioInput';
import { PREDEFINED_PERIODS } from '@/configs/date';

import styles from './date-range-radio-group.module.scss';

interface DateRangeRadioGroupProps {
	selectedPeriod: number | null;
	onSelectPeriod: (days: number) => void;
}

export const DateRangeRadioGroup = ({
	selectedPeriod,
	onSelectPeriod
}: DateRangeRadioGroupProps) => {
	return (
		<div className={styles.dateRadioButtons}>
			{PREDEFINED_PERIODS.map(period => (
				<RadioInput
					key={period.days}
					label={period.label}
					name='datePeriod'
					checked={selectedPeriod === period.days}
					onChange={() => onSelectPeriod(period.days)}
					className={
						selectedPeriod === period.days ? styles.radioLabelSelected : ''
					}
				/>
			))}
		</div>
	);
};
