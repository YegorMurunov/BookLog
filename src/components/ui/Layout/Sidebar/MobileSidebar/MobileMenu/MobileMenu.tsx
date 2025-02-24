import { mobileMenu } from '@/configs/sidebar-menu';

import MobileMenuItem from './MobileMenuItem/MobileMenuItem';

import styles from '../mobile-sidebar.module.scss';

const MobileMenu = () => {
	return (
		<nav className={styles.menu}>
			<ul className={styles['menu-ul']}>
				{mobileMenu.map(({ title, path, icon: Icon }, index) => (
					<MobileMenuItem
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

export default MobileMenu;
