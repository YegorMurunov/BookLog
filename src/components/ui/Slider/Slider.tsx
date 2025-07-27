import clsx from 'clsx';
import { memo } from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { ISliderProps } from '@/types/ui/slider.interface';

import './slider.scss';

const SliderComponent = ({
	children,
	className,
	slidesPerView = 1,
	spaceBetween = 20,
	loop = false,
	autoplay = false,
	autoplayDelay = 5000,
	navigation = false,
	pagination = false,
	breakpoints,
	allowTouchMove = true,
	isDraggable = true,
	autoHeight = false,
	animationDuration = 500,
	onSlideChange,
	onSwiperInit
}: ISliderProps) => {
	const modules = [
		...(navigation ? [Navigation] : []),
		...(pagination ? [Pagination] : []),
		...(autoplay ? [Autoplay] : [])
	];

	return (
		<Swiper
			className={clsx('slider', className)}
			modules={modules}
			spaceBetween={spaceBetween}
			slidesPerView={slidesPerView}
			loop={loop}
			autoplay={
				autoplay
					? {
							delay: autoplayDelay,
							pauseOnMouseEnter: true,
							disableOnInteraction: false,
							stopOnLastSlide: false,
							waitForTransition: true
						}
					: false
			}
			navigation={navigation}
			pagination={pagination ? { clickable: true, enabled: true } : false}
			draggable={isDraggable}
			allowTouchMove={allowTouchMove}
			breakpoints={breakpoints}
			onSlideChange={onSlideChange}
			onSwiper={onSwiperInit}
			autoHeight={autoHeight}
			observeParents={autoHeight}
			observer={autoHeight}
			speed={animationDuration}
		>
			{children.map((slide, index) => (
				<SwiperSlide key={index}>{slide}</SwiperSlide>
			))}
		</Swiper>
	);
};

const Slider = memo(SliderComponent);

export default Slider;
