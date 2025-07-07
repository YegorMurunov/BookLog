import type { PropsWithChildren } from 'react';

export interface IAuthGuardProps extends PropsWithChildren {
	isProtected?: boolean; // Защищенный маршрут (если true, требует авторизацию)
	redirectTo: string; // Куда редиректить, если не проходит проверку
	replace?: boolean;
}
