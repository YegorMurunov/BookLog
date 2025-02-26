import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useBooks } from '@/hooks/useBooks';
import { IBook } from '@/types/api/books.interface';

import TableItem from './TableItem/TableItem';

import styles from './table.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const Table = () => {
	const { isLoading, filteredBooks } = useBooks();

	const tableContent = useMemo(() => {
		return filteredBooks.map((book: IBook, index) => {
			console.log('render item');
			return <TableItem key={book.id} book={book} index={index} />;
		});
	}, [filteredBooks]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th></th>
							<th>Название</th>
							<th>Автор</th>
							<th>Жанры</th>
							<th>Кол-во страниц</th>
							<th>Статус</th>
							<th>Дата</th>
							<th>Оценка</th>
							{/* <th>Лучшая книга</th> */}
							<th>Примечания</th>
							{!isLoading ? <th></th> : ''}
						</tr>
					</thead>
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
		</div>
	);
};
export default Table;
