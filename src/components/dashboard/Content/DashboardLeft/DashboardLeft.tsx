import { memo } from 'react';

import Slider from '@/components/ui/Slider/Slider';

import AuthorsChart from './AuthorsChart/AuthorsChart';
import BooksChart from './BooksChart/BooksChart';
import GenresChart from './GenresChart/GenresChart';

import styles from './dashboard-left.module.scss';

const DashboardLeftComponent = () => {
	return (
		<Slider
			className={styles.slider}
			pagination
			// autoplay
			// autoplayDelay={10000}
			// loop
			autoHeight
			animationDuration={600}
		>
			{[
				<BooksChart key='books-chart' />,
				<GenresChart key='genres-chart' />,
				<AuthorsChart key='authors-chart' />
			]}
		</Slider>
	);
};

const DashboardLeft = memo(DashboardLeftComponent);

export default DashboardLeft;
