import clsx from 'clsx';
import { NavLink } from 'react-router';

import CustomTooltip from '@/components/ui/Tooltip/Tooltip';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IMenuItemProps } from '@/types/ui/sidebar-menu-item.interface';

import styles from '../../sidebar.module.scss';

const MenuItem = ({ title, path, icon: Icon, id }: IMenuItemProps) => {
	const { isCollapsed, isTablet } = useTypedSelector(state => state.sidebar);
	const { setCollapsedState } = useActions();

	return (
		<li className={styles['menu-li']} key={id}>
			{isCollapsed && !isTablet && (
				<CustomTooltip
					id={`menu-tooltip-${id}`}
					place='right'
					title={title}
					key={id}
					delay={500}
				/>
			)}
			<NavLink
				to={path}
				id={`menu-tooltip-${id}`}
				className={({ isActive }) =>
					clsx(styles['menu-navLink'], isActive && styles.active)
				}
				onClick={() => {
					if (isTablet && !isCollapsed) {
						setCollapsedState(true);
					}
				}}
			>
				<i className={styles['menu-icon']}>{<Icon />}</i>
				<span className={clsx(styles.collapsed)}>{title}</span>
			</NavLink>
		</li>
	);
};

export default MenuItem;
