import clsx from 'clsx';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

import type { IStarRatingProps } from '@/types/ui/star-rating.interface';

import styles from './star-rating.module.scss';

const StarRating = ({
	value = 0,
	onChange,
	size = 24,
	className
}: IStarRatingProps) => {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (onChange && value > 0) {
			setIsActive(true);
			const timeout = setTimeout(() => setIsActive(false), 500); // Убираем анимацию после 0.5 секунд

			return () => clearTimeout(timeout);
		}
	}, [value, onChange]);

	return (
		<div
			className={clsx(
				styles['star-rating-wrapper'],
				className,
				isActive && styles.active
			)}
		>
			<ReactStars
				count={5}
				value={value}
				onChange={onChange}
				size={size}
				half={true}
				color2='rgb(251, 227, 56)'
				color1='#d2d1d1'
				edit={!!onChange}
			/>
			<button
				className={styles.clear}
				type='button'
				onClick={() => onChange && onChange(0)}
			>
				<X />
			</button>
		</div>
	);
};

export default StarRating;
