import clsx from 'clsx';
import { useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { IDropdownProps } from '@/types/ui/dropdown.interface';

import { ButtonWithIcon } from '../buttons/ButtonWithIcon/ButtonWithIcon';

import styles from './dropdown.module.scss';

export const Dropdown = ({
	title,
	icon: Icon,
	items,
	counts,
	activeIndex,
	onSelect,
	className
}: IDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = () => {
		setIsOpen(false);
	};

	useOnClickOutside(ref, handleClickOutside);

	return (
		<div className={clsx(styles.dropdownContainer, className)} ref={ref}>
			<ButtonWithIcon
				icon={Icon}
				title={title}
				type='button'
				colorTheme='light'
				onClick={() => setIsOpen(!isOpen)}
				className={styles.dropdownButton}
			/>

			<div className={clsx(styles.dropdownMenu, isOpen && styles.open)}>
				<ul className={styles.filterList}>
					{items.map(({ label, value }, index) => (
						<li
							key={value}
							className={clsx(styles.filterItem, {
								[styles.active]: activeIndex === index
							})}
							onClick={() => {
								onSelect(index);
								setIsOpen(false);
							}}
						>
							{label}
							{counts && (
								<span className={styles.count}>
									{counts.find(item => item.value === value)?.count}
								</span>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
