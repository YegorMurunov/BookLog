import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

import type { IBooksFiltersItemProps } from '@/types/ui/books-filters-item.interface';

import styles from '../filters.module.scss';

const ActiveLine = () => {
	return <motion.div className={styles.activeLine} layoutId='active-filter' />;
};

const FiltersItem = ({
	value,
	isSelected,
	label,
	count = 0,
	handleClick
}: IBooksFiltersItemProps) => {
	return (
		<li
			key={value}
			className={clsx(styles.item, isSelected && styles.active)}
			onClick={handleClick}
		>
			{label}
			<span className={styles.count}>{count}</span>
			<AnimatePresence mode='wait'>
				{isSelected && <ActiveLine />}
			</AnimatePresence>
		</li>
	);
};

export default FiltersItem;
