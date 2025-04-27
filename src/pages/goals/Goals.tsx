import { AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';

import GoalsContent from '@/components/goals/Content/GoalsContent';
import GoalsHeader from '@/components/goals/Header/GoalsHeader';
import DeleteModal from '@/components/ui/DeleteModal/DeleteModal';
import { useTypedSelector } from '@/hooks/useTypedSelector';

// import styles from './goals.module.scss';

const Goals = () => {
	const { isOpen: isDeleteModal } = useTypedSelector(
		state => state.deleteModal
	);

	return (
		<>
			<Helmet>
				<title>Цели | BookLog</title>
			</Helmet>
			<GoalsHeader />
			<GoalsContent />
			<AnimatePresence>{isDeleteModal && <DeleteModal />}</AnimatePresence>
		</>
	);
};

export default Goals;
