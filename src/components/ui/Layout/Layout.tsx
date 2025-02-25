import clsx from 'clsx';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import PageLoader from '../PageLoader/PageLoader';
import Sidebar from './Sidebar/Sidebar';

import styles from './layout.module.scss';

const Layout = () => {
	const { isOpen: isBookModal } = useTypedSelector(state => state.bookModal);
	const { isOpen: isDeleteModal } = useTypedSelector(
		state => state.deleteModal
	);

	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<main
				className={clsx(
					styles.page,
					(isBookModal || isDeleteModal) && styles['no-scroll']
				)}
			>
				{
					<Suspense fallback={<PageLoader />}>
						<Outlet />
					</Suspense>
				}
			</main>
		</div>
	);
};

export default Layout;
