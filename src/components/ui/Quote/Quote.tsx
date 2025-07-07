import clsx from 'clsx';

import type { IQuoteProps } from '@/types/ui/quote.interface';

import styles from './quote.module.scss';

const QuoteCard = ({ author, quote, className }: IQuoteProps) => {
	return (
		<blockquote className={clsx(styles.quoteContainer, className)}>
			<p className={styles.quote}>«{quote}»</p>
			<cite className={styles.author}>— {author}</cite>
		</blockquote>
	);
};

export default QuoteCard;
