import clsx from 'clsx';
import { LogOut, Save, SaveOff, UserRoundPen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Input from '@/components/ui/fields/Input/Input';
import { useAuth } from '@/hooks/useAuth';
import { IProfileForm } from '@/types/ui/profile-form.interface';
import { IUserUpdateProfile } from '@/types/user.interface';

import styles from './edit-form.module.scss';

const EditForm = () => {
	const { logOut, userData, updateProfile } = useAuth();
	const isLoading = userData.isLoading;
	const displayName = userData.user?.displayName;
	const photoURL = userData.user?.photoURL;

	const [isEdit, setIsEdit] = useState(false);

	const { handleSubmit, control, reset } = useForm<IProfileForm>({
		mode: 'onSubmit',
		defaultValues: {
			displayName: displayName || 'User',
			photoURL: photoURL || ''
		}
	});

	// Обновляем форму, когда данные загружены
	useEffect(() => {
		if (!isLoading && displayName) {
			reset({ displayName, photoURL: photoURL || '' });
		}
	}, [isLoading, displayName, photoURL, reset]);

	const onSubmit: SubmitHandler<IProfileForm> = async data => {
		const photoURL = data.photoURL || null;

		const newProfileData: IUserUpdateProfile = {
			displayName: data.displayName,
			photoURL: photoURL
		};

		await updateProfile(newProfileData).then(() => setIsEdit(false));
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
									value={field.value ?? ''}
									className={clsx(
										styles.input,
										fieldState?.error?.message && 'mb-5'
									)}
								/>
							);
						}}
					/>
					{/* <Controller
						control={control}
						name='photoURL'
						render={({ field, fieldState }) => (
							<FileInput
								// {...field}
								onChange={field.onChange}
								ref={field.ref}
								name='avatar'
								placeholder='Загрузите аватар'
								error={fieldState?.error?.message}
								accept='image/*'
								className='mt-5 w-full max-w-[300px]'
							/>
						)}
					/> */}
					<Controller
						control={control}
						name='photoURL'
						rules={{
							required: false
						}}
						render={({ field, fieldState }) => {
							return (
								<Input
									{...field}
									label='Ссылка на аватар'
									type='text'
									error={fieldState?.error?.message}
									value={field.value ?? ''}
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
