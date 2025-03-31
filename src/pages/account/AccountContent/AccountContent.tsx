import { useAuth } from '@/hooks/useAuth';
import { useBooks } from '@/hooks/useBooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { formatAccountAge, getDateString } from '@/utils/formate-date.utils';

import EditForm from '../EditForm/EditForm';

import styles from '../account.module.scss';

const AccountContent = () => {
	const { userData } = useAuth();

	const displayName = useTypedSelector(state => state.auth.user?.displayName);

	const email = userData.user?.email;

	// User Info
	let createdAt = '';
	let accountAge = '';
	if (userData.user?.creationTime) {
		createdAt = getDateString(userData.user?.creationTime || '', 'ru');
		accountAge = formatAccountAge(userData.user?.creationTime);
	}

	const { stats } = useBooks();
	const mainStats = stats.main;

	return (
		<div className={styles.content}>
			<div className={styles.userInfo}>
				<h2 className={styles.name}>{displayName ? displayName : 'User'}</h2>
				<span className={styles.email}>{email}</span>

				<div className={styles.data}>
					<div className={styles.data__item}>
						<div className={styles.data__title}>Зарегистрирован</div>
						<div className={styles.data__text}>{createdAt}</div>
					</div>
					<div className={styles.data__item}>
						<div className={styles.data__title}>На сервисе</div>
						<div className={styles.data__text}>{accountAge}</div>
					</div>
					<div className={styles.data__item}>
						<div className={styles.data__title}>Прочитано книг</div>
						<div className={styles.data__text}>{mainStats.read}</div>
					</div>
					<div className={styles.data__item}>
						<div className={styles.data__title}>Прочитано страниц</div>
						<div className={styles.data__text}>
							{mainStats.pagesSum.toLocaleString()}
						</div>
					</div>
				</div>
			</div>
			<EditForm />
		</div>
	);
};

export default AccountContent;
