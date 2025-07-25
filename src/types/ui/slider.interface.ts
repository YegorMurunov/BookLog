import type { ReactNode } from 'react';
import type { Swiper, SwiperOptions } from 'swiper/types';

export interface ISliderProps {
	children: ReactNode[];
	className?: string;

	// Swiper core options
	spaceBetween?: number;
	slidesPerView?: number | 'auto';
	breakpoints?: SwiperOptions['breakpoints'];

	// Optional modules
	navigation?: boolean;
	pagination?: boolean;
	loop?: boolean;
	autoplay?: boolean;
	autoplayDelay?: number;

	// User experience
	allowTouchMove?: boolean;
	isDraggable?: boolean;

	// others
	autoHeight?: boolean;
	animationDuration?: number;

	// Callbacks
	onSlideChange?: () => void;
	onSwiperInit?: (swiper: Swiper) => void;
}
