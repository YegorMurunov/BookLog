import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';

import { IMenuItemProps } from '@/types/ui/sidebar-menu-item.interface';

import styles from '../../mobile-sidebar.module.scss';

const ActiveItem = () => {
	return <motion.div className={styles.activeItem} layoutId='active-filter' />;
};

const MobileMenuItem = ({ path, icon: Icon, id }: IMenuItemProps) => {
	const location = useLocation();
	const [isActivePage, setIsActivePage] = useState(false);

	useEffect(() => {
		setIsActivePage(location.pathname === path);
	}, [location.pathname, path]);

	return (
		<li className={styles['menu-li']} key={id}>
			<NavLink
				to={path}
				className={({ isActive }) =>
					clsx(styles['menu-navLink'], isActive && styles.active)
				}
			>
				<i className={styles['menu-icon']}>{<Icon />}</i>

				<AnimatePresence mode='wait'>
					{isActivePage && <ActiveItem />}
				</AnimatePresence>
			</NavLink>
		</li>
	);
};

export default MobileMenuItem;
