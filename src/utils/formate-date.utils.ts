export const formatDate = (
	date: Date | string | undefined,
	separator: string = '-'
): string => {
	if (!date) return '';

	const parsedDate = typeof date === 'string' ? new Date(date) : date;

	if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
		return '';
	}

	const year = parsedDate.getFullYear();
	const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
	const day = parsedDate.getDate().toString().padStart(2, '0');

	return `${year}${separator}${month}${separator}${day}`;
};

export const formatDateFromNum = ({
	year,
	month,
	day
}: {
	year: number;
	month: number;
	day: number;
}): string => {
	const mm = month.toString().padStart(2, '0'); // "01", "02", ..., "12"
	const dd = day.toString().padStart(2, '0'); // "01", "02", ..., "31"
	return `${year}-${mm}-${dd}`;
};
