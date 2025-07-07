import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import Input from '@/components/ui/fields/Input/Input';
import { useGoals } from '@/hooks/useGoals';
import type { TGoalForm } from '@/types/ui/goals.interface';

import styles from './goals-form.module.scss';

const GoalsForm = () => {
	const { addGoal, goals } = useGoals();

	const { handleSubmit, control, formState, setValue } = useForm<TGoalForm>({
		mode: 'onSubmit',
		defaultValues: {
			title: ''
		}
	});

	const onSubmit: SubmitHandler<TGoalForm> = async data => {
		const goalData: TGoalForm = {
			index: goals.length + 1,
			isCompleted: false,
			title: data.title
		};
		await addGoal(goalData).then(() => setValue('title', ''));
	};

	return (
		<form className={styles.goalsForm} onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name='title'
				rules={{
					required: 'Поле Цель обязательное!'
				}}
				render={({ field, fieldState }) => {
					return (
						<Input
							{...field}
							label='Добавить цель'
							type='text'
							name='title'
							error={fieldState?.error?.message}
							className={clsx(
								styles.goalsForm__input,
								fieldState?.error?.message && styles.error
							)}
							autoComplete='on'
						/>
					);
				}}
			/>
			<button
				type='submit'
				className={clsx(
					styles.goalsForm__btn,
					formState.errors.title && 'mt-0'
				)}
			>
				<Plus />
			</button>
		</form>
	);
};

export default GoalsForm;
