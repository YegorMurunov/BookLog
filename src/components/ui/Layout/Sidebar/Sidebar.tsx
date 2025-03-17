import clsx from 'clsx';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import * as m from 'motion/react-m';
import { useLayoutEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import useWindowDimensions from '@/hooks/useWindowDimensions';

import Menu from './Menu/Menu';
import MobileSidebar from './MobileSidebar/MobileSidebar';
import SidebarAccount from './SidebarAccount/SidebarAccount';

import styles from './sidebar.module.scss';

const Sidebar = () => {
	const { isCollapsed, isTablet, isMobile } = useTypedSelector(
		state => state.sidebar
	);
	const { toggleCollapse, setCollapsedState, setIsTablet, setIsMobile } =
		useActions();

	const { width } = useWindowDimensions();

	useLayoutEffect(() => {
		const storedState = localStorage.getItem('isCollapsed');
		if (storedState !== null) {
			setCollapsedState(JSON.parse(storedState));
		}
		if (width! <= 1024 && width! > 768) {
			setCollapsedState(true);
			setIsTablet(true);
			setIsMobile(false);
		} else if (width! <= 768) {
			setCollapsedState(true);
			setIsTablet(false);
			setIsMobile(true);
		} else {
			setIsTablet(false);
			setIsMobile(false);
		}
	}, [setCollapsedState, width, setIsTablet, setIsMobile]);

	return !isMobile ? (
		<m.aside
			className={clsx(
				styles.sidebar,
				isCollapsed && styles['menu-collapsed'],
				isTablet && styles.absolute
			)}
			animate={{
				width: isCollapsed ? 80 : width! >= 400 ? 330 : 280
			}}
			transition={{
				type: 'spring',
				stiffness: 300,
				damping: 20
			}}
		>
			<div className={styles.header}>
				<div className={styles.logo}>
					{/* <img src='/logo.svg' alt='BookLog' /> */}
					<h2 className={clsx(styles.appName)}>
						Book<span>Log</span>
					</h2>
				</div>
			</div>
			<button
				type='button'
				className={styles['collapse-icon']}
				onClick={() => toggleCollapse()}
			>
				{isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
			</button>
			<Menu />
			<div className={styles.footer}>
				<SidebarAccount />
			</div>
		</m.aside>
	) : (
		<MobileSidebar />
	);
};

export default Sidebar;
