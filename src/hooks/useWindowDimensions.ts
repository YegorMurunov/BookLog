import { useCallback, useEffect, useState } from 'react';

export default function useWindowDimensions() {
	const hasWindow = typeof window !== 'undefined';

	const getWindowDimensions = useCallback(() => {
		const width = hasWindow ? window.innerWidth : null;
		const height = hasWindow ? window.innerHeight : null;
		return { width, height };
	}, [hasWindow]);

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		if (hasWindow) {
			const handleResize = () => setWindowDimensions(getWindowDimensions());
			const handleOrientationChange = () =>
				setWindowDimensions(getWindowDimensions());

			window.addEventListener('resize', handleResize);
			window.addEventListener('orientationchange', handleOrientationChange);

			return () => {
				window.removeEventListener('resize', handleResize);
				window.removeEventListener(
					'orientationchange',
					handleOrientationChange
				);
			};
		}
	}, [getWindowDimensions, hasWindow]);

	return windowDimensions;
}
