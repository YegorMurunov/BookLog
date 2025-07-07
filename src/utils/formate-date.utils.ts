import {
	type Locale,
	differenceInCalendarDays,
	formatDuration,
	intervalToDuration,
	startOfDay
} from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatAccountAge = (
	creationTime: string,
	locale: Locale
): string => {
	const createdDate = startOfDay(new Date(creationTime));
	const now = startOfDay(new Date());

	const duration = intervalToDuration({
		start: createdDate,
		end: now
	});

	const formatted = formatDuration(duration, {
		format: ['years', 'months', 'days'],
		locale,
		delimiter: ', '
	});

	if (formatted) return formatted;

	// Если результат пустой (например, в первый день), возвращаем сообщение по локали
	if (locale === ru) return 'Первый день';

	// Для других языков — универсально
	return 'First day';
};

export const diffInDays = (
	start: Date | number,
	end: Date | number
): number => {
	return differenceInCalendarDays(end, start) + 1;
};

export const declOfNum = (
	number: number,
	words: [string, string, string]
): string => {
	const n = Math.abs(number) % 100;
	const n1 = n % 10;
	if (n > 10 && n < 20) return words[2];
	if (n1 > 1 && n1 < 5) return words[1];
	if (n1 === 1) return words[0];
	return words[2];
};
