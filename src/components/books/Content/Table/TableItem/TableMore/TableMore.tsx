import clsx from 'clsx';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

import { useActions } from '@/hooks/useActions';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import type { IDeleteModal } from '@/types/ui/delete-modal.interface';
import type { ITableItemProps } from '@/types/ui/table.interface';

import styles from '../../table.module.scss';

const TableMore = ({ book }: ITableItemProps) => {
	const [isShow, setIsShow] = useState(false);

	const { openBookModal, openDeleteModal } = useActions();

	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = () => {
		setIsShow(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	const modalData: Omit<IDeleteModal, 'isOpen'> = {
		id: book.id,
		typeOfObject: 'table'
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
						onClick={() => openBookModal({ type: 'edit', book })}
					>
						<Pencil />
					</button>
				</li>
				<li>
					<button
						type='button'
						className={clsx(styles.ulBtn, styles.deleteBtn)}
						onClick={() => openDeleteModal(modalData)}
					>
						<Trash2 />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default TableMore;
