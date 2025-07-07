import { useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import Pagination from '@/components/ui/Pagination/Pagination';
import { useBooks } from '@/hooks/useBooks';
import type { IBook } from '@/types/api/books.interface';

import TableHeader from './TableHeader/TableHeader';
import TableItem from './TableItem/TableItem';

import styles from './table.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const Table = () => {
	const {
		isLoading,
		paginatedBooks,
		totalPages,
		currentPage,
		setPage,
		clearFilters,
		setSort
	} = useBooks();

	const tableContent = useMemo(() => {
		return paginatedBooks.map((book: IBook, index) => {
			return <TableItem key={book.id} book={book} index={index} />;
		});
	}, [paginatedBooks]);

	const handlePageChange = (page: number) => {
		setPage(page);
	};

	useEffect(() => {
		clearFilters();
		// Default filter to sort by date descending
		setSort({
			type: 'date',
			direction: 'desc'
		});
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<TableHeader />

					{/* <thead className={styles.thead}>
						<tr>
							<th></th>
							<th>Название</th>
							<th>Автор</th>
							<th>Жанры</th>
							<th>Кол-во страниц</th>
							<th>Статус</th>
							<th>Дата</th>
							<th>Оценка</th>
							<th>Примечания</th>
							{!isLoading ? <th></th> : ''}
						</tr>
					</thead> */}
					<tbody className={styles.tbody}>
						{isLoading
							? [...Array(5)].map((_, i) => (
									<tr key={i}>
										<td>
											<Skeleton width={20} height={20} />
										</td>
										<td>
											<Skeleton width={150} />
										</td>
										<td>
											<Skeleton width={100} />
										</td>
										<td>
											<Skeleton width={80} />
										</td>
										<td>
											<Skeleton width={50} />
										</td>
										<td>
											<Skeleton width={80} />
										</td>
										<td>
											<Skeleton width={90} />
										</td>
										<td>
											<Skeleton width={40} />
										</td>
										<td>
											<Skeleton width={150} />
										</td>
									</tr>
								))
							: tableContent}
					</tbody>
				</table>
			</div>
			<div>
				{totalPages > 1 && (
					<Pagination
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						className={styles.pagination}
					/>
				)}
			</div>
		</div>
	);
};
export default Table;
