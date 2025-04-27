import clsx from 'clsx';
import * as m from 'motion/react-m';
import { useRef } from 'react';

import { useActions } from '@/hooks/useActions';
import { useBooks } from '@/hooks/useBooks';
import { useGoals } from '@/hooks/useGoals';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './delete-modal.module.scss';

function DeleteModal() {
	const { closeDeleteModal } = useActions();
	const { deleteBook } = useBooks();
	const { deleteGoal } = useGoals();

	const { id, typeOfObject } = useTypedSelector(state => state.deleteModal);

	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = () => {
		closeDeleteModal();
	};

	useOnClickOutside(ref, handleClickOutside);

	const confirmDeleteBook = () => {
		if (id) {
			if (typeOfObject === 'table') {
				deleteBook(id).then(() => closeDeleteModal());
			} else {
				deleteGoal(id).then(() => closeDeleteModal());
			}
		}
	};

	return (
		<m.div
			className={styles.modal}
			initial={{
				opacity: 0
			}}
			animate={{
				opacity: 1
			}}
			exit={{
				opacity: 0,
				y: 500
			}}
			transition={{
				duration: 0.3
			}}
		>
			<div className={styles.content} ref={ref}>
				<div className={styles.title}>
					Вы уверены что хотите удалить{' '}
					{typeOfObject === 'table' ? 'книгу' : 'цель'}?
				</div>
				<div className={styles.buttons}>
					<button
						type='button'
						className={clsx(styles.button, styles.buttonDel)}
						onClick={confirmDeleteBook}
					>
						Удалить
					</button>
					<button
						type='button'
						onClick={() => closeDeleteModal()}
						className={styles.button}
					>
						Не удалять
					</button>
				</div>
			</div>
		</m.div>
	);
}

export default DeleteModal;
