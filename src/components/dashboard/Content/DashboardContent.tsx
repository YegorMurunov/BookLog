import DashboardFilters from './DashboardFilters/DashboardFilters';
import DashboardLeft from './DashboardLeft/DashboardLeft';
import DashboardRight from './DashboardRight/DashboardRight';

import styles from './dashboard-content.module.scss';

const DashboardContent = () => {
	return (
		<section className={styles.content}>
			<DashboardFilters />
			<div className={styles.dashboard__items}>
				<div className={styles.dashboard__left}>
					<DashboardLeft />
				</div>
				<div className={styles.dashboard__right}>
					<DashboardRight />
				</div>
			</div>
		</section>
	);
};

export default DashboardContent;
