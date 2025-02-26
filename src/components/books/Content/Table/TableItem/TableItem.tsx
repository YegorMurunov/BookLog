import { Bookmark } from 'lucide-react';
import * as m from 'motion/react-m';
import { useState } from 'react';

import { BooksGenresData, BooksStatusData } from '@/configs/books-data';
import { useBooks } from '@/hooks/useBooks';
import { ITableItemProps } from '@/types/ui/table.interface';

import TableMore from './TableMore/TableMore';

import styles from '../table.module.scss';

export default function TableItem({ book, index }: ITableItemProps) {
	const [isCommentShow, setIsCommentShow] = useState(false);
	const { updateBook } = useBooks();
	const [isDisabled, setIsDisabled] = useState(false);

	// Format date once for better performance
	const formattedDate = book.date.split('-').reverse().join('/');

	// Find status once, not on each render if status doesn't change
	const status = BooksStatusData.find(status => status.value === book.status);
	const statusLabel = status?.label || '-';
	const statusColor = status?.color || '';

	// Shorten comment if necessary
	const [shortComment, isCommentShortened] = getCommentDetails(book.comment);

	const toggleIsTheBest = async () => {
		setIsDisabled(true);
		const bookId = book.id;
		const bookData = book;
		bookData.isTheBestBook = !book.isTheBestBook;

		await updateBook(bookId, bookData).finally(() => setIsDisabled(false));
	};

	const listVariants = {
		initial: {
			y: 100,
			opacity: 0
		},
		animate: (custom: number) => ({
			y: 0,
			opacity: 1,
			transition: {
				delay: custom * 0.05,
				type: 'spring',
				stiffness: 150,
				damping: 15
			}
		})
	};

	return (
		<m.tr
			variants={listVariants}
			initial='initial'
			animate='animate'
			custom={index}
		>
			<td className={styles.isTheBest}>
				<button
					className={styles.isTheBestBtn}
					onClick={toggleIsTheBest}
					type='button'
					disabled={isDisabled}
				>
					<Bookmark className={book.isTheBestBook ? styles.theBest : ''} />
				</button>
			</td>
			<td>{book.title}</td>
			<td>{book.author}</td>
			<td className={styles.genres}>
				{book.genres.map(genre => {
					const genreInData = BooksGenresData.find(
						genreData => genreData.value === genre
					);
					const label = genreInData?.label;
					const value = genreInData?.value;
					const color = genreInData?.color || '';
					return (
						<span
							key={value}
							className={styles.genre}
							style={{
								backgroundColor: color
							}}
						>
							{label}
						</span>
					);
				})}
			</td>
			<td>{book.pageCount}</td>
			<td className={styles.status}>
				<span
					className={styles.statusItem}
					style={{
						backgroundColor: statusColor
					}}
				>
					{statusLabel}
				</span>
			</td>
			<td>{formattedDate}</td>
			<td>{book.rating}</td>
			<td className='min-w-[300px] max-w-[300px]'>
				{isCommentShortened ? (
					<div
						onClick={() => setIsCommentShow(prev => !prev)}
						className={styles.shortComment}
					>
						{isCommentShow ? book.comment : `${shortComment}...`}
					</div>
				) : (
					book.comment
				)}
			</td>
			<td className={styles.moreTd}>
				<TableMore book={book} />
			</td>
		</m.tr>
	);
}

// Helper function to handle comment formatting
function getCommentDetails(comment: string): [string, boolean] {
	const words = comment.split(' ');
	const shortComment = words.slice(0, 10).join(' ');
	return [shortComment, comment.length > shortComment.length];
}
