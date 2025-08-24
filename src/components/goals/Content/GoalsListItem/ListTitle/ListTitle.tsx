import clsx from 'clsx';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { memo, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Input from '@/components/ui/fields/Input/Input';
import { useGoals } from '@/hooks/useGoals';
import type {
	IGoalsListTitle,
	IListTitleProps
} from '@/types/api/goals.interface';

import styles from './list-title.module.scss';

const ListTitleComponent = ({ list }: IListTitleProps) => {
	const listTitle = list?.title;
	const listId = list?.id;

	const { editTitle, deleteGoalsList } = useGoals();

	const [isEdit, setIsEdit] = useState(false);

	const { handleSubmit, control } = useForm<IGoalsListTitle>({
		mode: 'onSubmit',
		defaultValues: {
			title: listTitle || 'Новый список'
		}
	});

	const onSubmit: SubmitHandler<IGoalsListTitle> = async data => {
		await editTitle(listId, data.title).finally(() => setIsEdit(false));
	};

	return (
		<h2 className={styles.ListTitle}>
			{isEdit ? (
				<form className={styles.titleForm} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name='title'
						rules={{
							required: 'Поле Название списка обязательное!'
						}}
						render={({ field, fieldState }) => {
							return (
								<Input
									{...field}
									label='Название списка'
									type='text'
									name='goals-title'
									error={fieldState?.error?.message}
									className={clsx(
										styles.titleInput,
										fieldState?.error?.message && 'mb-6'
									)}
									autoComplete='off'
								/>
							);
						}}
					/>
					<button
						type='submit'
						className={clsx(styles.titleBtn, styles.saveBtn)}
					>
						<Check />
					</button>
				</form>
			) : (
				listTitle || 'Новый список'
			)}
			<div className={styles.titleBtns}>
				<button
					type='button'
					className={clsx(styles.titleBtn, isEdit && styles.edit)}
					onClick={() => setIsEdit(!isEdit)}
				>
					{isEdit ? <X /> : <Pencil />}
				</button>
				{!isEdit && (
					<button
						type='button'
						className={clsx(styles.titleBtn, styles.delete)}
						onClick={() => deleteGoalsList(listId)}
					>
						<Trash2 />
					</button>
				)}
			</div>
		</h2>
	);
};

const ListTitle = memo(ListTitleComponent);

export default ListTitle;
