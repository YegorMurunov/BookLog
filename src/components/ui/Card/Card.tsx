import clsx from 'clsx';

import { ICardProps } from '@/types/ui/card.interface';

import AnimatedCounter from '../AnimatedCounter';

import styles from './card.module.scss';

const Card = ({
	title,
	mainValue,
	subtext,
	className,
	subtextValue
}: ICardProps) => {
	return (
		<div className={clsx(styles.card, className)}>
			<div className={styles.title}>{title}</div>
			{
				<AnimatedCounter
					className={styles.value}
					from={0}
					to={mainValue}
					duration={3}
				/>
			}
			<div className={styles.subtext}>
				{subtextValue && <span>{subtextValue}</span>}
				{subtext}
			</div>
		</div>
	);
};

export default Card;
