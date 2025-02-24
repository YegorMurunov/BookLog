import clsx from 'clsx';
import { CircleUserRound, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { useAuth } from '@/hooks/useAuth';

import styles from '../sidebar.module.scss';

const SidebarAccount = () => {
	const { userData, logOut } = useAuth();
	const photoURL = userData.user?.photoURL;
	const displayName = userData.user?.displayName || 'User';
	const [errorImage, setErrorImage] = useState(false);

	return (
		<div className={styles.account}>
			<Link to='/account'>
				<div className={styles.photo}>
					{photoURL && !errorImage ? (
						<img
							src={photoURL}
							alt='user'
							onError={() => setErrorImage(true)}
						/>
					) : (
						<CircleUserRound />
					)}
				</div>
				<div className={clsx(styles.user, styles.collapsed)}>
					<div className={styles.name}>{displayName}</div>
					{/* <div className={styles.email}>{shortenedEmail}</div> */}
				</div>
			</Link>
			<button type='button' className={styles.exit} onClick={logOut}>
				<LogOut />
			</button>
		</div>
	);
};

export default SidebarAccount;
