import clsx from 'clsx';
import { LogOut, Save, SaveOff, UserRoundPen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Input from '@/components/ui/fields/Input/Input';
import { useAuth } from '@/hooks/useAuth';
import { IProfileForm } from '@/types/ui/profile-form.interface';

import styles from './edit-form.module.scss';

const EditForm = () => {
	const { logOut, userData, updateProfile } = useAuth();
	const isLoading = userData.isLoading;
	const displayName = userData.user?.displayName;

	const [isEdit, setIsEdit] = useState(false);

	const { handleSubmit, control, reset } = useForm<IProfileForm>({
		mode: 'onSubmit',
		defaultValues: {
			displayName: displayName || 'User'
		}
	});

	// Обновляем форму, когда данные загружены
	useEffect(() => {
		if (!isLoading && displayName) {
			reset({ displayName });
		}
	}, [isLoading, displayName, reset]);

	const onSubmit: SubmitHandler<IProfileForm> = async data => {
		await updateProfile(data.displayName).then(() => setIsEdit(false));
	};

	return (
		<div className={styles.editContainer}>
			{isEdit && <h2 className={styles.editTitle}>Редактирование профиля</h2>}
			{isEdit && (
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name='displayName'
						rules={{
							required: 'Поле Никнейм обязательное!'
						}}
						render={({ field, fieldState }) => {
							return (
								<Input
									{...field}
									label='Никнейм'
									type='text'
									error={fieldState?.error?.message}
									className={clsx(
										styles.input,
										fieldState?.error?.message && 'mb-5'
									)}
								/>
							);
						}}
					/>

					<div className={styles.buttons}>
						<button className={styles.button} type='submit'>
							Сохранить <Save />
						</button>
						<button
							onClick={() => setIsEdit(false)}
							className={styles.button}
							type='button'
						>
							Отмена <SaveOff />
						</button>
					</div>
				</form>
			)}
			{!isEdit && (
				<div className={styles.buttons}>
					<button
						onClick={() => setIsEdit(true)}
						className={styles.button}
						type='button'
					>
						Редактировать <UserRoundPen />
					</button>
					<button onClick={logOut} className={styles.button} type='button'>
						Выход <LogOut />
					</button>
				</div>
			)}
		</div>
	);
};

export default EditForm;
