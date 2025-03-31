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

export const getDateString = (dateString: string, lang: string = 'ru') => {
	const date = new Date(dateString);

	const monthsShortRu = [
		'Янв',
		'Фев',
		'Мар',
		'Апр',
		'Май',
		'Июн',
		'Июл',
		'Авг',
		'Сен',
		'Окт',
		'Ноя',
		'Дек'
	];
	const monthsShortEn = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const day = date.getUTCDate();
	const monthIndex = date.getUTCMonth();
	const year = date.getUTCFullYear();

	const months = lang === 'en' ? monthsShortEn : monthsShortRu;

	return `${day} ${months[monthIndex]}, ${year}`;
};

export const calculateAccountAge = (
	creationTime: string
): {
	years: number;
	months: number;
	days: number;
} => {
	const createdDate = new Date(creationTime);
	const now = new Date();

	let years = now.getFullYear() - createdDate.getFullYear();
	let months = now.getMonth() - createdDate.getMonth();
	let days = now.getDate() - createdDate.getDate();

	if (days < 0) {
		const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
		days += prevMonth.getDate();
		months--;
	}

	if (months < 0) {
		months += 12;
		years--;
	}

	return { years, months, days };
};

// Функции для правильного склонения слов
const pluralize = (count: number, forms: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return `${count} ${
		forms[
			count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
		]
	}`;
};

export const formatAccountAge = (creationTime: string): string => {
	const { years, months, days } = calculateAccountAge(creationTime);
	const parts: string[] = [];

	if (years > 0) {
		parts.push(pluralize(years, ['год', 'года', 'лет']));
	}
	if (months > 0) {
		parts.push(pluralize(months, ['месяц', 'месяца', 'месяцев']));
	}
	if (days > 0) {
		parts.push(pluralize(days, ['день', 'дня', 'дней']));
	}

	if (parts.length === 0) {
		return 'Первый день';
	}

	return parts.join(', ');
};
