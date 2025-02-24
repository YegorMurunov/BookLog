import clsx from 'clsx';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

import { useActions } from '@/hooks/useActions';
import { useBooks } from '@/hooks/useBooks';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { ITableItemProps } from '@/types/ui/table.interface';

import styles from '../../table.module.scss';

const TableMore = ({ book }: ITableItemProps) => {
	const [isShow, setIsShow] = useState(false);
	const { deleteBook } = useBooks();

	const { openModal } = useActions();

	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = () => {
		setIsShow(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	const removeBook = (bookId: string) => {
		deleteBook(bookId);
	};

	return (
		<div className={styles.moreDiv} ref={ref}>
			<button
				className={styles.moreBtn}
				type='button'
				onClick={() => setIsShow(!isShow)}
			>
				<EllipsisVertical />
			</button>
			<ul className={clsx(styles.moreUl, isShow && styles.show)}>
				<li>
					<button
						type='button'
						className={styles.ulBtn}
						onClick={() => openModal({ type: 'edit', book })}
					>
						<Pencil />
					</button>
				</li>
				<li>
					<button
						type='button'
						className={clsx(styles.ulBtn, styles.deleteBtn)}
						onClick={() => removeBook(book.id)}
					>
						<Trash2 />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default TableMore;
