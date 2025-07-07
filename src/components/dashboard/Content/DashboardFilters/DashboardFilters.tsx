import clsx from 'clsx';
import { Filter } from 'lucide-react';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';

import { Dropdown } from '@/components/ui/Dropdown/Dropdown';
import CustomSelect from '@/components/ui/Select/CustomSelect';
import { BooksGenresData, BooksStatusData } from '@/configs/books-data';
import { DashboardRatingData, type TRating } from '@/configs/dashboard-data';
import { useDashboard } from '@/hooks/useDashboard';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import type { TGenres, TStatus } from '@/types/api/books.interface';
import type { IDashboardFormFilters } from '@/types/api/dashboard.interface';
import { calcDefaultPeriod } from '@/utils/dashboard-filters.utils';

import { DatepickerFilter } from './DatepickerFilter/DatepickerFilter';

import styles from './dashboard-filters.module.scss';

const DashboardFilters = () => {
	const { filters } = useTypedSelector(state => state.dashboardFilters);
	const { updateDashboardFilters } = useDashboard();
	const defaultPeriod = useMemo(() => calcDefaultPeriod(filters), [filters]);

	const { control, watch } = useForm<IDashboardFormFilters>({
		defaultValues: {
			genres: filters.genres
				? BooksGenresData.filter(g =>
						filters.genres?.includes(g.value as TGenres)
					)
				: [],
			status: filters.status
				? BooksStatusData.filter(s =>
						filters.status?.includes(s.value as TStatus)
					)
				: [],
			dateFrom: filters.dateFrom,
			dateTo: filters.dateTo,
			rating: filters.rating
				? DashboardRatingData.filter(g =>
						filters.rating?.includes(g.value as TRating)
					)
				: []
		}
	});

	const [watchedGenres, watchedStatus, watchedRating] = watch([
		'genres',
		'status',
		'rating'
	]);

	const debouncedUpdateFilters = useDebouncedCallback(
		(newFilters: Partial<IDashboardFormFilters>) => {
			updateDashboardFilters({
				genres: newFilters.genres?.map(g => g.value as TGenres) || [],
				status: newFilters.status?.map(s => s.value as TStatus) || [],
				dateFrom: filters.dateFrom,
				dateTo: filters.dateTo,
				rating: newFilters.rating?.map(g => g.value as TRating) || []
			});
		},
		300,
		{ leading: false, trailing: true }
	);

	const isFiltersActive = useMemo(
		() =>
			Boolean(watchedGenres.length) ||
			Boolean(watchedStatus.length) ||
			Boolean(watchedRating.length),
		[watchedGenres, watchedStatus, watchedRating]
	);

	useEffect(() => {
		debouncedUpdateFilters({
			genres: watchedGenres,
			status: watchedStatus,
			rating: watchedRating
		});
	}, [watchedGenres, watchedStatus, watchedRating, debouncedUpdateFilters]);

	const dropdownContent = useCallback(
		() => (
			<div className={styles.filter__content}>
				<div className={styles.input}>
					<Controller
						control={control}
						name='genres'
						render={({ field, fieldState }) => (
							<CustomSelect
								{...field}
								error={fieldState?.error?.message}
								isSearchable
								isClearable
								options={BooksGenresData}
								placeholder='Выберите жанр...'
								isMulti
								isMenuRelative={true}
							/>
						)}
					/>
				</div>
				<div className={styles.input}>
					<Controller
						control={control}
						name='status'
						render={({ field, fieldState }) => (
							<CustomSelect
								{...field}
								error={fieldState?.error?.message}
								// isSearchable
								isClearable
								options={BooksStatusData}
								placeholder='Выберите статус...'
								isMulti
								isMenuRelative={true}
							/>
						)}
					/>
				</div>
				<div className={styles.input}>
					<Controller
						control={control}
						name='rating'
						render={({ field, fieldState }) => (
							<CustomSelect
								{...field}
								error={fieldState?.error?.message}
								// isSearchable
								isClearable
								options={DashboardRatingData}
								placeholder='Оценка'
								isMulti
								isMenuRelative={true}
							/>
						)}
					/>
				</div>
			</div>
		),
		[control]
	);

	return (
		<div className={styles.filters}>
			<div className={styles.filters__items}>
				<div
					className={clsx(
						styles.filters__item,
						isFiltersActive && styles.active
					)}
				>
					<Dropdown
						icon={Filter}
						title='Фильтры'
						dropdownContentClassName={styles.dropdownContent}
					>
						{dropdownContent}
					</Dropdown>
				</div>
				<div className={styles.filters__item}>
					<DatepickerFilter DefaultPeriod={defaultPeriod} />
				</div>
			</div>
		</div>
	);
};

export default DashboardFilters;
