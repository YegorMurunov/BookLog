import { PropsWithChildren } from 'react';

type bannerType = 'default' | 'empty';

export interface IBannerProps extends PropsWithChildren {
	pageTitle: string;
	className?: string;
	bannerImg?: string;
	type?: bannerType;
}
