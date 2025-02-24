import { Helmet } from 'react-helmet-async';

import { useAuth } from '@/hooks/useAuth';

import styles from './dashboard.module.scss';

// TODO: Конфиг тайтлов приложения!

const Dashboard = () => {
	const { userData } = useAuth();

	return userData.isLoading ? (
		<div>Loading........</div>
	) : (
		<div className={styles.test}>
			<Helmet>
				<title>Дашбоард | BookLog</title>
			</Helmet>

			<h1 className='text-xl font-bold'>Dashboard page:</h1>
			<h3 className='text-md font-bold'>
				Welcome: {userData.user?.displayName}
			</h3>
		</div>
	);
};

export default Dashboard;
