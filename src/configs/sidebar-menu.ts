import { ChartArea, CircleUserRound, Goal, LibraryBig } from 'lucide-react';

import { IMenuItemProps } from '@/types/ui/sidebar-menu-item.interface';

const baseMenu: Omit<IMenuItemProps, 'id'>[] = [
	{
		title: 'Дашбоард',
		path: '/dashboard',
		icon: ChartArea
	},
	{
		title: 'Книги',
		path: '/books',
		icon: LibraryBig
	},
	{
		title: 'Цели',
		path: '/goals',
		icon: Goal
	}
];

export const sidebarMenu = [...baseMenu];

export const mobileMenu = [
	...baseMenu,
	{
		title: 'Аккаунт',
		path: '/account',
		icon: CircleUserRound
	}
];
