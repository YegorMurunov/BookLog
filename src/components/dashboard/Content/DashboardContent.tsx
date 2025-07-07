import { useDashboard } from '@/hooks/useDashboard';

import DashboardFilters from './DashboardFilters/DashboardFilters';

import styles from './dashboard-content.module.scss';

const DashboardContent = () => {
	const { dashboardBooks } = useDashboard();

	return (
		<section className={styles.content}>
			<DashboardFilters />
			<div>
				{dashboardBooks.map(book => (
					<div key={book.id}>{book.title}</div>
				))}
			</div>
		</section>
	);
};

export default DashboardContent;
