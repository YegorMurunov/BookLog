import clsx from 'clsx';
import { Check, Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import Input from '@/components/ui/fields/Input/Input';
import { useGoals } from '@/hooks/useGoals';
import { IGoalsListTitle } from '@/types/ui/goals.interface';

import styles from '../goals-content.module.scss';

const GoalsTitle = () => {
	const { editGoalsTitle, goalsTitle, isLoadingTitle } = useGoals();

	const [isEdit, setIsEdit] = useState(false);

	const { handleSubmit, control, reset } = useForm<IGoalsListTitle>({
		mode: 'onSubmit',
		defaultValues: {
			title: goalsTitle || 'Цели на год'
		}
	});

	// Обновляем форму, когда данные загружены
	useEffect(() => {
		if (!isLoadingTitle && goalsTitle) {
			reset({ title: goalsTitle });
		}
	}, [isLoadingTitle, goalsTitle, reset]);

	const onSubmit: SubmitHandler<IGoalsListTitle> = async data => {
		const titleData: IGoalsListTitle = {
			title: data.title
		};

		await editGoalsTitle(titleData).finally(() => setIsEdit(false));
	};

	return (
		<h2 className={styles.GoalTitle}>
			{isLoadingTitle ? (
				<Skeleton width={200} />
			) : isEdit ? (
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
				goalsTitle || 'Цели на год'
			)}
			{!isLoadingTitle && (
				<button
					type='button'
					className={clsx(styles.titleBtn, isEdit && styles.edit)}
					onClick={() => setIsEdit(!isEdit)}
				>
					{isEdit ? <X /> : <Pencil />}
				</button>
			)}
		</h2>
	);
};

export default GoalsTitle;
