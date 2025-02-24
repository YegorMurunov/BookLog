import { PropsWithChildren } from 'react';

export interface IBannerProps extends PropsWithChildren {
	pageTitle: string;
	className?: string;
}
