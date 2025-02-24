import clsx from 'clsx';

import { IBannerProps } from '@/types/ui/banner.interface';

import styles from './banner.module.scss';

const Banner = ({ pageTitle, children, className }: IBannerProps) => {
	return (
		<div className={clsx(styles.banner, className)}>
			<h1 className={styles.title}>{pageTitle}</h1>
			{children && <div className={styles.cards}>{children}</div>}
		</div>
	);
};

export default Banner;
