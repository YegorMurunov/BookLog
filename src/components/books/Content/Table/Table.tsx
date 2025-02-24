import { useMemo } from 'react';

import { useBooks } from '@/hooks/useBooks';
import { IBook } from '@/types/api/books.interface';

import TableItem from './TableItem/TableItem';

import styles from './table.module.scss';

const Table = () => {
	const { isLoading, filteredBooks } = useBooks();

	const tableContent = useMemo(() => {
		return filteredBooks.map((book: IBook) => {
			console.log('render item');
			return <TableItem key={book.id} book={book} />;
		});
	}, [filteredBooks]);

	return (
		<div className={styles.wrapper}>
			{isLoading ? (
				<div className={styles.loader}>Loading...</div>
			) : (
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
								<th></th>
							</tr>
						</thead>
						<tbody className={styles.tbody}>{tableContent}</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
export default Table;
