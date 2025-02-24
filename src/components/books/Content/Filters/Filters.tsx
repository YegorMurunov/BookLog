import clsx from 'clsx';
import { Filter } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import { BooksFiltersData } from '@/configs/books-filters';
import { useBooks } from '@/hooks/useBooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import FiltersItem from './FiltersItem/FiltersItem';

import styles from './filters.module.scss';

const Filters = () => {
	const { stats } = useBooks();

	const mainStats = stats.main;

	const counts = [
		{
			value: 'all',
			count: mainStats.all
		},
		{
			value: 'best',
			count: mainStats.bestCount
		},
		{
			value: 'underread',
			count: mainStats.underread
		},
		{
			value: 'reread',
			count: mainStats.reread
		},
		{
			value: 'reading',
			count: mainStats.reading
		}
	];

	const [activeIndex, setActiveIndex] = useState(0);

	const { isTablet, isMobile } = useTypedSelector(state => state.sidebar);

	useEffect(() => {
		// console.log('Filtered books', filteredBooks);
		// логика обработки выбранного фильтра
		const value = BooksFiltersData[activeIndex].value;
		console.log(value);
		// filterBooks(value);
	}, [activeIndex]);

	const handleSelectFilter = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<div className={styles.filters}>
			{!isTablet && !isMobile ? (
				<ul className={clsx(styles.ul, styles.pcUl)}>
					{BooksFiltersData.map(({ label, value }, index) => {
						return (
							<FiltersItem
								handleClick={() => handleSelectFilter(index)}
								isSelected={activeIndex === index}
								key={value}
								value={value}
								label={label}
								count={counts.filter(item => item.value === value)[0].count}
							/>
						);
					})}
				</ul>
			) : (
				<Dropdown
					title='Фильтр'
					icon={Filter}
					items={BooksFiltersData}
					counts={counts}
					activeIndex={activeIndex}
					onSelect={handleSelectFilter}
					className={styles.filtersDropdown}
				/>
			)}
		</div>
	);
};

export default Filters;
