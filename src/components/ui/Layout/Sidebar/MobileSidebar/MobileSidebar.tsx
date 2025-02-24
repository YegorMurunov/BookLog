import MobileMenu from './MobileMenu/MobileMenu';

import styles from './mobile-sidebar.module.scss';

const MobileSidebar = () => {
	return (
		<aside className={styles.mobMenu}>
			<MobileMenu />
		</aside>
	);
};

export default MobileSidebar;
