import { X } from 'lucide-react';
import * as m from 'motion/react-m';
import { useRef } from 'react';

import { useActions } from '@/hooks/useActions';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import ModalForm from './ModalForm/ModalForm';

import styles from './modal.module.scss';

function Modal() {
	const { type } = useTypedSelector(state => state.bookModal);
	const { closeBookModal } = useActions();

	const pageTitle =
		type === 'create' ? 'Добавить книгу 📕' : 'Редактировать книгу 📕';

	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = () => {
		closeBookModal();
	};

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className={styles.modal}>
			<m.div
				className={styles.content}
				ref={ref}
				initial={{
					opacity: 0,
					y: 500
				}}
				animate={{
					opacity: 1,
					y: 0
				}}
				exit={{
					opacity: 0,
					y: 500
				}}
				transition={{
					duration: 0.3
				}}
			>
				<div className={styles.title}>{pageTitle}</div>
				<ModalForm />

				<button
					onClick={() => closeBookModal()}
					type='button'
					className={styles.close}
				>
					<X />
				</button>
			</m.div>
		</div>
	);
}

export default Modal;
