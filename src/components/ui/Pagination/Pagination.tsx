import clsx from 'clsx';

// import { ChevronLeft, ChevronRight } from 'lucide-react';

import { IPaginationProps } from '@/types/ui/pagination.interface';

import styles from './pagination.module.scss';

const Pagination = ({
	totalPages,
	currentPage,
	onPageChange,
	className,
	buttonClassName,
	activeButtonClassName,
	disabledButtonClassName
}: IPaginationProps) => {
	// const handlePrevious = () => {
	// 	if (currentPage > 1) {
	// 		onPageChange(currentPage - 1);
	// 	}
	// };

	// const handleNext = () => {
	// 	if (currentPage < totalPages) {
	// 		onPageChange(currentPage + 1);
	// 	}
	// };

	return (
		<div className={clsx(styles.pagination, className)}>
			<div className={styles.pageBtns}>
				{/* Page buttons */}
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
					return (
						<button
							key={page}
							onClick={() => onPageChange(page)}
							disabled={currentPage === page}
							className={clsx(
								styles.button,
								buttonClassName,
								currentPage === page && styles.active,
								currentPage === page && activeButtonClassName,
								currentPage === page && disabledButtonClassName
							)}
						>
							{page}
						</button>
					);
				})}
			</div>

			{/* Arrows */}
			{/* <div className={styles.navigation}>
				<button
					onClick={handlePrevious}
					disabled={currentPage === 1}
					className={clsx(
						styles.button,
						buttonClassName,
						currentPage === 1 && disabledButtonClassName
					)}
				>
					<ChevronLeft />
				</button>
				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className={clsx(
						styles.button,
						buttonClassName,
						currentPage === totalPages && disabledButtonClassName
					)}
				>
					<ChevronRight />
				</button>
			</div> */}
		</div>
	);
};

export default Pagination;
