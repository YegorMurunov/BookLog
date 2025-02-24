import { CircleUserRound, LogOut } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import Banner from '@/components/ui/Banner/Banner';
import { useAuth } from '@/hooks/useAuth';

import styles from './account.module.scss';

const Account = () => {
	const { logOut, userData } = useAuth();
	const displayName = userData.user?.displayName;
	const email = userData.user?.email;
	const photoURL = userData.user?.photoURL;

	return (
		<>
			<Helmet>
				<title>Аккаунт | BookLog</title>
			</Helmet>
			<Banner pageTitle='Аккаунт' />
			<div className={styles.content}>
				<div className={styles.text}>
					<h2 className={styles.title}>
						Привет, {displayName ? displayName : email}
					</h2>
					<p>
						Тут ты можешь поменять некоторые данные, такие как Имя и Аватар.
					</p>
					<p>
						На данный момент этот функционал еще в разработке, оставайся с нами
						:)
					</p>
				</div>
				<div className={styles.currentUserData}>
					<div className={styles.userImg}>
						{photoURL ? (
							<img className={styles.avatar} src={photoURL} />
						) : (
							<CircleUserRound />
						)}
					</div>
					<div className={styles.userName}>{displayName || 'User'}</div>
					<div className={styles.userEmail}>{email}</div>
				</div>
				<button onClick={logOut} className={styles.logout}>
					Выйти <LogOut />
				</button>
			</div>
		</>
	);
};

export default Account;
