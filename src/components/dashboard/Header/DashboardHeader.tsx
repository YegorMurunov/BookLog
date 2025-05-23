import Banner from '@/components/ui/Banner/Banner';
import Card from '@/components/ui/Card/Card';
import { useBooks } from '@/hooks/useBooks';

const DashboardHeader = () => {
	const { stats } = useBooks();
	const mainStats = stats.main;
	const monthlyStats = stats.monthly;

	return (
		<header>
			<Banner pageTitle='Дашбоард' type='default'>
				<Card
					mainValue={mainStats.read}
					title='Прочитано книг'
					subtextValue={`+${monthlyStats.booksReadThisMonth}`}
					subtext='за последний месяц'
				/>
				<Card
					mainValue={mainStats.pagesSum}
					title='Прочитано страниц'
					subtextValue={`+${monthlyStats.pagesReadThisMonth}`}
					subtext='за последний месяц'
				/>
				<Card
					mainValue={mainStats.avgRating}
					title='Средний рейтинг'
					subtextValue={`${monthlyStats.ratingDiff}`}
					subtext='за последний месяц'
					tooltipText='Книги с рейтингом 0 не влияют на статистику'
					index={1}
				/>
				<Card
					mainValue={mainStats.bestCount}
					title='Лучших книг'
					subtextValue={`+${monthlyStats.bestBookThisMonth}`}
					subtext='за последний месяц'
				/>
			</Banner>
		</header>
	);
};
export default DashboardHeader;
