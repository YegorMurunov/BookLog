import clsx from 'clsx';

import { IProgressbarWidgetProps } from '@/types/ui/progressbar.interface';

import Progressbar from '../Progressbar/Progressbar';

import styles from './progressbar-widget.module.scss';

const ProgressbarWidget = ({
	value,
	children,
	className
}: IProgressbarWidgetProps) => {
	return (
		<div className={clsx(styles.widgetContainer, className)}>
			<div className={clsx(styles.widget, styles.widgetWidthVariant)}>
				<Progressbar value={value} text={`${value}%`} />
				<div className={styles.widgetRight}>
					<div className={styles.widgetTitle}>Прогресс</div>
					{children && (
						<div className={styles.widgetDescription}>{children}</div>
					)}
				</div>
			</div>
			<div className={clsx(styles.widget, styles.widgetHeightVariant)}>
				<div className={styles.widgetTitle}>Прогресс</div>
				<Progressbar value={value} text={`${value}%`} />
				{children && <div className={styles.widgetDescription}>{children}</div>}
			</div>
		</div>
	);
};

export default ProgressbarWidget;
