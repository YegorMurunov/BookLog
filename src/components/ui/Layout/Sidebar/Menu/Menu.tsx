import { sidebarMenu } from '@/configs/sidebar-menu';

import MenuItem from './MenuItem/MenuItem';

import styles from '../sidebar.module.scss';

const Menu = () => {
	return (
		<nav className={styles.menu}>
			<ul className={styles['menu-ul']}>
				{sidebarMenu.map(({ title, path, icon: Icon }, index) => (
					<MenuItem
						title={title}
						path={path}
						icon={Icon}
						key={path}
						id={index}
					/>
				))}
			</ul>
		</nav>
	);
};

export default Menu;
