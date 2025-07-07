import clsx from 'clsx';
import { memo, useMemo } from 'react';

import { tableColumns } from '@/configs/table-header-data';
import { useBooks } from '@/hooks/useBooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import type { ISortParams } from '@/types/api/books.interface';

import styles from '../table.module.scss';

const TableHeader = memo(() => {
	const { setSort } = useBooks();
	const { currentSort } = useTypedSelector(state => state.tableFilters);

	const handleSort = (id: string, defaultDirection: 'asc' | 'desc') => {
		const type = id as keyof ISortParams;
		const curDirection = currentSort.type === id ? currentSort.direction : null;
		let direction: 'asc' | 'desc' = defaultDirection;

		if (curDirection) {
			direction = curDirection === 'asc' ? 'desc' : 'asc';
		}

		setSort({
			type,
			direction
		});
	};

	const tableContent = useMemo(() => {
		return tableColumns.map(column => {
			const isActive = currentSort.type === column.id;
			const currentDirection = isActive ? currentSort.direction : undefined;

			// Определяем иконки для сортировки
			const IconAsc = column.iconAsc;
			const IconDesc = column.iconDesc;
			const defaultDirection = column.defaultSort || 'desc';
			const DefaultIcon = defaultDirection === 'asc' ? IconAsc : IconDesc;

			return (
				<th key={column.id}>
					{column.isSortable ? (
						<span
							className={clsx(styles.headerCell, isActive && styles.active)}
							onClick={() => handleSort(column.id, defaultDirection)}
						>
							{column.label}
							{IconAsc && IconDesc && DefaultIcon && (
								<i className={styles.sortIcon}>
									{currentDirection === 'asc' ? (
										<IconAsc />
									) : currentDirection === 'desc' ? (
										<IconDesc />
									) : (
										<DefaultIcon />
									)}
								</i>
							)}
						</span>
					) : (
						column.label
					)}
				</th>
			);
		});
	}, [currentSort]);

	return (
		<thead className={styles.thead}>
			<tr>{tableContent}</tr>
		</thead>
	);
});

export default TableHeader;
