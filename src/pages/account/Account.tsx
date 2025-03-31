import { CircleUserRound } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Banner from '@/components/ui/Banner/Banner';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import AccountContent from './AccountContent/AccountContent';

import styles from './account.module.scss';

const Account = () => {
	const photoURL = useTypedSelector(state => state.auth.user?.photoURL);
	const [errorImage, setErrorImage] = useState(false);
	// const bannerImg =

	return (
		<>
			<Helmet>
				<title>Аккаунт | BookLog</title>
			</Helmet>
			<Banner pageTitle='Аккаунт' type='empty' />
			<div className={styles.accountAvatar}>
				{photoURL && !errorImage ? (
					<img
						className={styles.avatar}
						src={photoURL}
						onError={() => setErrorImage(true)}
					/>
				) : (
					<CircleUserRound />
				)}
			</div>
			<AccountContent />
		</>
	);
};

export default Account;
