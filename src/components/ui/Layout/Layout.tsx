import clsx from 'clsx';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { useTypedSelector } from '@/hooks/useTypedSelector';

import PageLoader from '../PageLoader/PageLoader';
import Sidebar from './Sidebar/Sidebar';

import styles from './layout.module.scss';

const Layout = () => {
	const { isOpen } = useTypedSelector(state => state.modal);

	return (
		<div className={clsx(styles.wrapper, isOpen && styles.blur)}>
			<Sidebar />
			<main className={clsx(styles.page, isOpen && styles['no-scroll'])}>
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
