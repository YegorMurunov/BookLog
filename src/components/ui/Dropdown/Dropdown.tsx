import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import type { IDropdownProps } from '@/types/ui/dropdown.interface';

import { ButtonWithIcon } from '../buttons/ButtonWithIcon/ButtonWithIcon';

import styles from './dropdown.module.scss';

export const DropdownComponent = ({
	title,
	icon: Icon,
	children,
	className,
	dropdownContentClassName
}: IDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(containerRef, () => setIsOpen(false));

	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const rect = dropdownRef.current.getBoundingClientRect();

			// Если вылезает за правый край
			if (rect.right > window.innerWidth) {
				dropdownRef.current.style.left = `-${rect.right - window.innerWidth + +37}px`;
			} else {
				dropdownRef.current.style.left = '0';
			}
		}
		// window.addEventListener('resize', () => setIsOpen(false));
		// return () => {
		// 	window.removeEventListener('resize', () => setIsOpen(false));
		// };
	}, [isOpen]);

	return (
		<div
			className={clsx(styles.dropdownContainer, className)}
			ref={containerRef}
		>
			<ButtonWithIcon
				icon={Icon}
				title={title}
				type='button'
				colorTheme='light'
				onClick={() => setIsOpen(!isOpen)}
				className={styles.dropdownButton}
			/>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={dropdownRef}
						className={clsx(styles.dropdownContent, dropdownContentClassName)}
						initial={{
							scale: 0.95,
							opacity: 0
						}}
						animate={{
							scale: 1,
							opacity: 1
						}}
						exit={{
							scale: 0.95,
							opacity: 0
						}}
						transition={{
							duration: 0.3
						}}
					>
						{children(() => setIsOpen(false))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export const Dropdown = memo(DropdownComponent);
