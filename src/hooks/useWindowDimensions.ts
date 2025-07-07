import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function useWindowDimensions() {
	const hasWindow = typeof window !== 'undefined';

	const getWindowDimensions = () => {
		const width = hasWindow ? window.innerWidth : null;
		const height = hasWindow ? window.innerHeight : null;
		return { width, height };
	};

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	const debouncedSetWindowDimensions = useDebouncedCallback(
		() => {
			setWindowDimensions(getWindowDimensions());
		},
		50,
		{ leading: false, trailing: true }
	);

	useEffect(() => {
		if (hasWindow) {
			window.addEventListener('resize', debouncedSetWindowDimensions);
			window.addEventListener(
				'orientationchange',
				debouncedSetWindowDimensions
			);

			return () => {
				window.removeEventListener('resize', debouncedSetWindowDimensions);
				window.removeEventListener(
					'orientationchange',
					debouncedSetWindowDimensions
				);
			};
		}
	}, [debouncedSetWindowDimensions, hasWindow]);

	return windowDimensions;
}
