import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { IProgressbarProps } from '@/types/ui/progressbar.interface';

import styles from './progressbar.module.scss';
import 'react-circular-progressbar/dist/styles.css';

const Progressbar = ({ value, text, className }: IProgressbarProps) => {
	const [percent, setPercent] = useState(0);
	const [animate, setAnimate] = useState(true);

	useEffect(() => {
		if (animate) {
			const interval = setInterval(() => {
				setPercent(value);
				setAnimate(false); // turn off animation after first update
			}, 100); // interval to update the progress bar
			return () => clearInterval(interval);
		}
		setPercent(value); // set the value immediately if animate is false
	}, [value, animate]);

	const pathColor =
		percent <= 30 ? '#ffa500' : percent >= 70 ? '#61ccad' : '#75c4fc';
	const textColor =
		percent === 0
			? '#d2d1d1'
			: percent <= 30
				? '#ffa500'
				: percent >= 70
					? '#61ccad'
					: '#75c4fc';

	return (
		<div className={clsx(styles.progressbarContainer, className)}>
			<CircularProgressbar
				value={percent}
				text={text}
				circleRatio={0.75}
				styles={buildStyles({
					pathColor: pathColor,
					textColor: textColor,
					textSize: '1.125rem',
					trailColor: '#d2d1d1',
					backgroundColor: '#fff',
					rotation: 0.625,
					pathTransitionDuration: 0.5
				})}
				className={styles.progressbar}
			/>
		</div>
	);
};

export default Progressbar;
