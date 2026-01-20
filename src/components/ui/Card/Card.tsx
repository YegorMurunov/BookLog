import clsx from 'clsx';
import { memo } from 'react';

import type { ICardProps } from '@/types/ui/card.interface';

import AnimatedCounter from '../AnimatedCounter';
import CardInfo from './CardInfo/CardInfo';

import styles from './card.module.scss';

const Card = memo(
	({
		title,
		mainValue,
		subtext,
		className,
		subtextValue,
		tooltipText,
		index
	}: ICardProps) => {
		return (
			<div className={clsx(styles.card, className)}>
				<div className={styles.title}>
					{title}
					{tooltipText && index && (
						<CardInfo title={tooltipText} index={index} />
					)}
				</div>
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
	}
);

export default Card;
