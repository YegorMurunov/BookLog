import { Loader } from 'lucide-react';

import styles from './page-loader.module.scss';

const PageLoader = () => {
	return (
		<div className={styles.container}>
			<Loader className={styles.icon} color='#3a3a3a' />
		</div>
	);
};

export default PageLoader;
