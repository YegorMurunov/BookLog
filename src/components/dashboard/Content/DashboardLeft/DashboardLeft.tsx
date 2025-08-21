import { memo, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Swiper as SwiperType } from 'swiper';

import Slider from '@/components/ui/Slider/Slider';
import { useBooks } from '@/hooks/useBooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import AuthorsChart from './AuthorsChart/AuthorsChart';
import BooksChart from './BooksChart/BooksChart';
import GenresChart from './GenresChart/GenresChart';

import styles from './dashboard-left.module.scss';

const DashboardLeftComponent = () => {
	const swiperRef = useRef<SwiperType | null>(null);
	const { books } = useBooks();

	// Получаем фильтры
	const { filters } = useTypedSelector(state => state.dashboardFilters);

	// Сброс autoplay при смене фильтров
	useEffect(() => {
		if (!swiperRef.current) return;
		swiperRef.current.autoplay.stop();
		swiperRef.current.autoplay.start();
	}, [filters]);

	return books.length === 0 ? (
		<div className={styles.empty}>
			<p>Вы не добавили еще не одной книги.</p>
			<p>
				Это можно сдлать на странице{' '}
				{
					<Link to='/books' className='text-skyblue underline'>
						Книги
					</Link>
				}
			</p>
		</div>
	) : (
		<Slider
			className={styles.slider}
			pagination
			autoplay
			autoplayDelay={10000}
			loop
			autoHeight
			animationDuration={600}
			onSwiperInit={swiper => {
				swiperRef.current = swiper;
			}}
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
