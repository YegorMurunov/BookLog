import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

import AuthForm from '@/components/auth/AuthForm/AuthForm';

const Login = () => {
	const location = useLocation();

	const fromPage = location.state?.from?.pathname || '/dashboard';

	return (
		<>
			<Helmet>
				<title>Войти | BookLog</title>
			</Helmet>
			<AuthForm type='login' navigateTo={fromPage} />
		</>
	);
};

export default Login;
