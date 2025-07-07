import { Tooltip } from 'react-tooltip';

import type { ITooltipProps } from '@/types/ui/tooltip.interface';

const CustomTooltip = ({ id, title, place, delay = 0 }: ITooltipProps) => {
	return (
		<Tooltip
			anchorSelect={`#${id}`}
			content={title}
			delayShow={delay}
			style={{
				backgroundColor: '#d2d1d1',
				color: '#181818',
				fontFamily: 'Inter, sans-serif',
				zIndex: 9999,
				position: 'fixed'
			}}
			place={place}
		/>
	);
};

export default CustomTooltip;
