import clsx from 'clsx';

import type { IProgressbarWidgetProps } from '@/types/ui/progressbar.interface';

import Progressbar from '../Progressbar/Progressbar';

import styles from './progressbar-widget.module.scss';

const ProgressbarWidget = ({
	value,
	children,
	className,
	vertical,
	title
}: IProgressbarWidgetProps) => {
	return (
		<div
			className={clsx(
				styles.widgetContainer,
				className,
				vertical && styles.verticalImportant
			)}
		>
			<div className={clsx(styles.widget, styles.widgetWidthVariant)}>
				<Progressbar
					value={value}
					text={`${value}%`}
					className={styles.widget__progressbar}
				/>
				<div className={styles.widgetRight}>
					<div className={styles.widgetTitle}>Прогресс</div>
					{children && (
						<div className={styles.widgetDescription}>{children}</div>
					)}
				</div>
			</div>
			<div className={clsx(styles.widget, styles.widgetHeightVariant)}>
				<div className={styles.widgetTitle}>{title}</div>
				<Progressbar
					value={value}
					text={`${value}%`}
					className={styles.widget__progressbar}
				/>
				{children && <div className={styles.widgetDescription}>{children}</div>}
			</div>
		</div>
	);
};

export default ProgressbarWidget;
