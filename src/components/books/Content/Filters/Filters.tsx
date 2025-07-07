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
	const { stats, setFilters, clearFilters } = useBooks();
	const { filters } = useTypedSelector(state => state.tableFilters);

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

	useEffect(() => {
		if (filters.search) {
			setActiveIndex(0);
		}
	}, [filters]);

	const { isTablet, isMobile } = useTypedSelector(state => state.sidebar);

	const handleSelectFilter = (index: number) => {
		setActiveIndex(index);
		const value = BooksFiltersData[index].value;
		if (value === 'best') {
			return setFilters({ best: true });
		}
		if (value === 'all') {
			return clearFilters();
		}
		return setFilters({ status: value });
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
					className={styles.filtersDropdown}
					dropdownContentClassName={styles.dropdownContent}
				>
					{close => (
						<ul className={styles.filterList}>
							{BooksFiltersData.map(({ label, value }, index) => (
								<li
									key={value}
									className={clsx(styles.filterItem, {
										[styles.active]: activeIndex === index
									})}
									onClick={() => {
										handleSelectFilter(index);
										close();
									}}
								>
									{label}
									<span className={styles.count}>
										{counts.find(item => item.value === value)?.count || 0}
									</span>
								</li>
							))}
						</ul>
					)}
				</Dropdown>
			)}
		</div>
	);
};

export default Filters;
