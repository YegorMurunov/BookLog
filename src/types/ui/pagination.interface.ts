export interface IPaginationProps {
	totalPages: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	maxVisiblePages?: number;
	className?: string;
	buttonClassName?: string;
	activeButtonClassName?: string;
	disabledButtonClassName?: string;
}
