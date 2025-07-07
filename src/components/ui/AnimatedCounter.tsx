import { animate } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import type { IAnimatedCounterProps } from '@/types/ui/animated-counter.interface';

export const AnimatedCounter = ({
	from,
	to,
	duration = 3,
	className = ''
}: IAnimatedCounterProps) => {
	const [count, setCount] = useState<number>(from);
	useEffect(() => {
		const controls = animate(from, to, {
			duration,
			onUpdate(value) {
				const updatedValue = Number.isInteger(to) ? Math.round(value) : value;
				setCount(updatedValue);
			}
		});
		return () => controls.stop();
	}, [from, to, duration]);
	const formattedCount = useMemo(() => {
		return Number.isInteger(to) ? count.toLocaleString() : count.toFixed(1);
	}, [count, to]);
	return <span className={className}>{formattedCount}</span>;
};
export default AnimatedCounter;
