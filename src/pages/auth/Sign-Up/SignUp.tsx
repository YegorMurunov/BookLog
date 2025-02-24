import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

import AuthForm from '@/components/auth/AuthForm/AuthForm';

const SignUp = () => {
	const location = useLocation();

	const fromPage = location.state?.from?.pathname || '/dashboard';

	return (
		<>
			<Helmet>
				<title>Регистрация | BookLog</title>
			</Helmet>
			<AuthForm type='register' navigateTo={fromPage} />
		</>
	);
};

export default SignUp;
