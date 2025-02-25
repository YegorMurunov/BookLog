import clsx from 'clsx';
import { Bookmark } from 'lucide-react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CustomDatepicker from '@/components/ui/CustomDatepicker/CustomDatepicker';
import CustomSelect from '@/components/ui/Select/CustomSelect';
import StarRating from '@/components/ui/StarRating/StarRating';
import { Button } from '@/components/ui/buttons/Button/Button';
import IconCheckbox from '@/components/ui/fields/IconCheckbox/IconCheckbox';
import Input from '@/components/ui/fields/Input/Input';
import TextArea from '@/components/ui/fields/TextArea/TextArea';
import { BooksGenresData, BooksStatusData } from '@/configs/books-data';
import { useActions } from '@/hooks/useActions';
import { useBooks } from '@/hooks/useBooks';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { IBook } from '@/types/api/books.interface';
import { formType } from '@/types/ui/book-form.interface';
import {
	getGenreDataByValue,
	getStatusDataByValue,
	getValueByGenres
} from '@/utils/book-form.utils';
import { formatDate } from '@/utils/formate-date.utils';

import styles from './modal-form.module.scss';

function ModalForm() {
	const { type, book } = useTypedSelector(state => state.bookModal);
	const { closeBookModal } = useActions();

	const { addBook, updateBook } = useBooks();

	const { handleSubmit, control } = useForm<formType>({
		mode: 'onSubmit',
		defaultValues: {
			title: book ? book.title : '',
			author: book ? book.author : '',
			pageCount: book ? book.pageCount : null,
			genres: getGenreDataByValue(book?.genres),
			status: getStatusDataByValue(book?.status),
			date: book ? book.date : formatDate(new Date()),
			rating: book ? book.rating : 0,
			isTheBestBook: book ? book.isTheBestBook : false,
			comment: book ? book.comment : ''
		}
	});

	const onSubmit: SubmitHandler<formType> = async data => {
		const genres = Array.isArray(data.genres)
			? getValueByGenres(data.genres)
			: getValueByGenres([data.genres]);

		const bookData: Omit<IBook, 'id'> = {
			title: data.title,
			author: data.author,
			pageCount: Number(data.pageCount),
			genres: genres,
			status: data.status?.value!, // eslint-disable-line
			date: formatDate(data.date),
			rating: data.rating,
			isTheBestBook: data.isTheBestBook,
			comment: data.comment
		};

		if (type === 'create') {
			await addBook(bookData).then(() => closeBookModal());
		} else if (type === 'edit' && book) {
			await updateBook(book?.id, bookData).then(() => closeBookModal());
		}
	};

	const submitButtonText = type === 'create' ? 'Добавить книгу' : 'Сохранить';

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{/* field title */}
			<Controller
				control={control}
				name='title'
				rules={{
					required: 'Поле Название обязательное!'
				}}
				render={({ field, fieldState }) => {
					return (
						<Input
							{...field}
							label='Название книги'
							type='text'
							name='title'
							error={fieldState?.error?.message}
							className={clsx(
								styles.input,
								fieldState?.error?.message && 'mb-4'
							)}
							autoComplete='on'
						/>
					);
				}}
			/>

			{/* field author */}
			<Controller
				control={control}
				name='author'
				rules={{
					required: 'Поле Автор обязательное!'
				}}
				render={({ field, fieldState }) => {
					return (
						<Input
							{...field}
							label='Автор'
							type='text'
							name='author'
							error={fieldState?.error?.message}
							className={clsx(
								styles.input,
								fieldState?.error?.message && 'mb-4'
							)}
							autoComplete='on'
						/>
					);
				}}
			/>

			{/* select genres */}
			<Controller
				control={control}
				name='genres'
				rules={{
					required: 'Поле Жанр обязательное!'
				}}
				render={({ field, fieldState }) => {
					return (
						<div className={styles.input}>
							<CustomSelect
								{...field}
								error={fieldState?.error?.message}
								isSearchable
								options={BooksGenresData}
								placeholder='Выберите жанр...'
							/>
						</div>
					);
				}}
			/>

			{/* field pageCount */}
			<Controller
				control={control}
				name='pageCount'
				rules={{
					required: 'Поле Кол-во страниц обязательное!',
					min: { value: 1, message: 'Количество страниц должно быть больше 0!' }
				}}
				render={({ field, fieldState }) => {
					return (
						<Input
							{...field}
							label='Кол-во страниц'
							type='number'
							name='pageCount'
							value={field.value?.toString() || ''}
							error={fieldState?.error?.message}
							className={clsx(
								styles.input,
								fieldState?.error?.message && 'mb-4'
							)}
							autoComplete='off'
						/>
					);
				}}
			/>

			{/* select status */}
			<Controller
				control={control}
				name='status'
				rules={{
					required: 'Поле Статус обязательное!'
				}}
				render={({ field, fieldState }) => {
					return (
						<div className={styles.input}>
							<CustomSelect
								{...field}
								error={fieldState?.error?.message}
								isSearchable
								options={BooksStatusData}
								placeholder='Выберите статус...'
							/>
						</div>
					);
				}}
			/>

			{/* date picker */}
			<Controller
				control={control}
				name='date'
				rules={{
					required: 'Поле Дата обязательное!'
				}}
				render={({ field: { onChange, value }, fieldState }) => (
					<CustomDatepicker
						selected={value ? new Date(value) : null}
						onChange={date => onChange(date)}
						placeholder='Дата'
						className={styles.datepicker}
						error={fieldState.error?.message}
					/>
				)}
			/>

			{/* star rating and isTheBest */}
			<div className={styles.ratingAndBest}>
				<Controller
					control={control}
					name='rating'
					rules={{
						required: false
					}}
					render={({ field: { onChange, value } }) => (
						<StarRating
							value={value}
							onChange={onChange}
							size={36}
							className={styles.rating}
						/>
					)}
				/>
				<Controller
					control={control}
					name='isTheBestBook'
					rules={{ required: false }}
					render={({ field }) => (
						<IconCheckbox
							name='isTheBest'
							checked={field.value}
							onChange={(checked: boolean) => field.onChange(checked)}
							icon={Bookmark}
							tooltipTitle='Лучшая книга?'
							tooltipId='checkbox-isTheBest'
							tooltipDelay={500}
							className={styles.checkbox}
							defaultClassname={styles.defaultCheckbox}
							activeClassname={styles.activeCheckbox}
						/>
					)}
				/>
			</div>

			{/* field comment */}
			<Controller
				control={control}
				name='comment'
				rules={{
					required: false
				}}
				render={({ field, fieldState }) => {
					return (
						<TextArea
							{...field}
							name='comment'
							placeholder='Примечания...'
							error={fieldState.error?.message}
							className={styles.textarea}
						/>
					);
				}}
			/>

			<Button
				type='submit'
				title={submitButtonText}
				className={styles.btnSubmit}
			/>
		</form>
	);
}

export default ModalForm;
