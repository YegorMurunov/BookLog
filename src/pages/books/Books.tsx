import { AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

import BooksContent from '@/components/books/Content/BooksContent';
import BooksHeader from '@/components/books/Header/BooksHeader';
import Modal from '@/components/books/Modal/Modal';
import DeleteModal from '@/components/ui/DeleteModal/DeleteModal';
import { useTypedSelector } from '@/hooks/useTypedSelector';

// import styles from './books.module.scss';

const Books = () => {
	const { isOpen: isBookModal } = useTypedSelector(state => state.bookModal);
	const { isOpen: isDeleteModal } = useTypedSelector(
		state => state.deleteModal
	);

	return (
		<>
			<Helmet>
				<title>Книги | BookLog</title>
			</Helmet>
			<BooksHeader />
			<BooksContent />
			<AnimatePresence>{isBookModal && <Modal />}</AnimatePresence>
			<AnimatePresence>{isDeleteModal && <DeleteModal />}</AnimatePresence>
		</>
	);
};

export default Books;
