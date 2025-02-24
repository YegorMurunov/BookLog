import { X } from 'lucide-react';
import * as m from 'motion/react-m';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import ModalForm from './ModalForm/ModalForm';

import styles from './modal.module.scss';

function Modal() {
	const { type } = useTypedSelector(state => state.modal);
	const { closeModal } = useActions();

	const pageTitle =
		type === 'create' ? 'Добавить книгу 📕' : 'Редактировать книгу 📕';

	return (
		<m.div
			className={styles.modal}
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
			<div className={styles.content}>
				<div className={styles.title}>{pageTitle}</div>
				<ModalForm />

				<button
					onClick={() => closeModal()}
					type='button'
					className={styles.close}
				>
					<X />
				</button>
			</div>
		</m.div>
	);
}

export default Modal;
