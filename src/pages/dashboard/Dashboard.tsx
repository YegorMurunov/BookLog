import { Helmet } from 'react-helmet-async';

import DashboardContent from '@/components/dashboard/Content/DashboardContent';
import DashboardHeader from '@/components/dashboard/Header/DashboardHeader';

// import styles from './dashboard.module.scss';

const Dashboard = () => {
	return (
		<>
			<Helmet>
				<title>Дашбоард | BookLog</title>
			</Helmet>
			<DashboardHeader />
			<DashboardContent />
		</>
	);
};

export default Dashboard;
