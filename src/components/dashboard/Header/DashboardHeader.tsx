import { memo, useMemo } from 'react';

import Banner from '@/components/ui/Banner/Banner';
import Card from '@/components/ui/Card/Card';
import { useBooks } from '@/hooks/useBooks';
import { useDashboard } from '@/hooks/useDashboard';
import { generateMainStats } from '@/utils/generate-books-stats';

const DashboardHeader = memo(() => {
	const { stats } = useBooks();
	const { dashboardBooks } = useDashboard();

	const dashboardStats = useMemo(
		() => generateMainStats(dashboardBooks),
		[dashboardBooks]
	);

	const monthlyStats = useMemo(() => stats.monthly, [stats.monthly]);

	return (
		<header>
			<Banner pageTitle='Дашбоард' type='default'>
				<Card
					mainValue={dashboardStats.read}
					title='Прочитано книг'
					subtextValue={`+${monthlyStats.booksReadThisMonth}`}
					subtext='за последний месяц'
				/>
				<Card
					mainValue={dashboardStats.pagesSum}
					title='Прочитано страниц'
					subtextValue={`+${monthlyStats.pagesReadThisMonth}`}
					subtext='за последний месяц'
				/>
				<Card
					mainValue={dashboardStats.avgRating}
					title='Средний рейтинг'
					subtextValue={`${monthlyStats.ratingDiff}`}
					subtext='за последний месяц'
					tooltipText='Книги с рейтингом 0 не влияют на статистику'
					index={1}
				/>
				<Card
					mainValue={dashboardStats.bestCount}
					title='Лучших книг'
					subtextValue={`+${monthlyStats.bestBookThisMonth}`}
					subtext='за последний месяц'
				/>
				<Card
					mainValue={dashboardStats.reread}
					title='Перечитано книг'
					subtextValue={`+${monthlyStats.rereadBooksThisMonth}`}
					subtext='за последний месяц'
				/>
			</Banner>
		</header>
	);
});
export default DashboardHeader;
