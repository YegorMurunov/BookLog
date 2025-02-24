import { AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

import BooksContent from '@/components/books/Content/BooksContent';
import Header from '@/components/books/Header/Header';
import Modal from '@/components/books/Modal/Modal';
import { useTypedSelector } from '@/hooks/useTypedSelector';

// import styles from './books.module.scss';

const Books = () => {
	const { isOpen } = useTypedSelector(state => state.modal);

	return (
		<>
			<Helmet>
				<title>Книги | BookLog</title>
			</Helmet>
			<Header />
			<BooksContent />
			<AnimatePresence>{isOpen && <Modal />}</AnimatePresence>
		</>
	);
};

export default Books;
