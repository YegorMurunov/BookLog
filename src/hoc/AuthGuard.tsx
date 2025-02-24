import { Navigate, useLocation } from 'react-router';

import PageLoader from '@/components/ui/PageLoader/PageLoader';
import { useAuth } from '@/hooks/useAuth';
import { IAuthGuardProps } from '@/types/ui/auth-guard.interface';

const AuthGuard = ({
	children,
	isProtected = true,
	redirectTo,
	replace = false
}: IAuthGuardProps) => {
	const { isAuth, isLoading } = useAuth().userData;

	const location = useLocation();

	if (isLoading) {
		return <PageLoader />;
	}

	// Если страница защищенная и пользователь не авторизован -> перенаправляем на login и сохраняем текущий путь
	if (isProtected && !isAuth) {
		return (
			<Navigate to={redirectTo} state={{ from: location }} replace={replace} />
		);
	}

	// Если страница НЕ защищенная (логин, регистрация) и пользователь авторизован
	if (!isProtected && isAuth) {
		const backPath = location.state?.from?.pathname || '/dashboard';
		return <Navigate to={backPath} replace={replace} />;
	}

	return children;
};

export default AuthGuard;
