import { CirclePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { IconButton } from '@/components/ui/buttons/IconButton/IconButton';
import SearchInput from '@/components/ui/fields/SearchInput/SearchInput';
import { useActions } from '@/hooks/useActions';

import Filters from './Filters/Filters';
import Table from './Table/Table';

import styles from './books-content.module.scss';

const BooksContent = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const { openBookModal, setFilters } = useActions();

	const handleClick = () => {
		openBookModal({ type: 'create' });
	};

	const debouncedSetFilters = useDebouncedCallback(
		(search: string) => {
			setFilters({ search });
		},
		300,
		{ leading: false, trailing: true }
	);

	useEffect(() => {
		debouncedSetFilters(searchTerm);
	}, [searchTerm, debouncedSetFilters]);

	return (
		<section className={styles.content}>
			<Filters />
			<SearchInput
				label='Поиск'
				name='search'
				type='text'
				value={searchTerm}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setSearchTerm(e.target.value)
				}
				className={styles.searchInput}
				clearFn={() => {
					setSearchTerm('');
					setFilters({ search: '' });
				}}
				autoComplete='off'
			/>
			<Table />
			<IconButton
				icon={CirclePlus}
				tooltipPos='left'
				title='Добавить книгу'
				type='button'
				onClick={handleClick}
				className={styles.btnAdd}
			/>
		</section>
	);
};

export default BooksContent;
