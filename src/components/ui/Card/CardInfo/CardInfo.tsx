import { Info } from 'lucide-react';

import type { ICardInfo } from '@/types/ui/card.interface';

import CustomTooltip from '../../Tooltip/Tooltip';

import styles from '../card.module.scss';

const CardInfo = ({ title, index }: ICardInfo) => {
	return (
		<>
			<i className={styles.cardInfoIcon} id={`Card-Tooltip-${index}`}>
				<Info />
			</i>
			<CustomTooltip id={`Card-Tooltip-${index}`} title={title} place='top' />
		</>
	);
};

export default CardInfo;
