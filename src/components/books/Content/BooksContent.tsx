import { CirclePlus } from 'lucide-react';

import { IconButton } from '@/components/ui/buttons/IconButton/IconButton';
import { useActions } from '@/hooks/useActions';

import Filters from './Filters/Filters';
import Table from './Table/Table';

import styles from './books-content.module.scss';

const BooksContent = () => {
	// const [searchTerm, setSearchTerm] = useState('');
	const { openBookModal } = useActions();

	const handleClick = () => {
		openBookModal({ type: 'create' });
	};

	return (
		<section className={styles.content}>
			<Filters />
			{/* <SearchInput
				label='Поиск'
				name='search'
				type='text'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className={clsx(styles.item, styles.search)}
				clearFn={() => setSearchTerm('')}
				autoComplete='off'
			/> */}
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
