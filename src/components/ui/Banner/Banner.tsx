import clsx from 'clsx';
import { Info } from 'lucide-react';
import { useState } from 'react';

import type { IBannerProps } from '@/types/ui/banner.interface';

import CustomTooltip from '../Tooltip/Tooltip';

import styles from './banner.module.scss';

const Banner = ({
	pageTitle,
	children,
	className,
	bannerImg,
	type = 'default',
	tooltipText
}: IBannerProps) => {
	const [errorImage, setErrorImage] = useState(false);

	return type === 'empty' ? (
		bannerImg && !errorImage ? (
			<div className={clsx(styles['image-banner'], className)}>
				<img
					src={bannerImg}
					alt='user banner'
					onError={() => setErrorImage(true)}
				/>
			</div>
		) : (
			<div
				className={clsx(styles.banner, styles['image-banner'], className)}
			></div>
		)
	) : (
		<div className={clsx(styles.banner, className)}>
			<h1 className={styles.title}>
				{pageTitle}
				{tooltipText && (
					<span className={styles.bannerInfo}>
						<i className={styles.bannerInfo__icon} id='Banner-Tooltip'>
							<Info />
						</i>
						<CustomTooltip
							id='Banner-Tooltip'
							title={tooltipText}
							place='right'
						/>
					</span>
				)}
			</h1>
			{children && <div className={styles.cards}>{children}</div>}
		</div>
	);
};

export default Banner;
