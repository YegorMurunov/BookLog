import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

import googleIcon from '@/assets/google.svg';
import { Button } from '@/components/ui/buttons/Button/Button';
import { SignInWithButton } from '@/components/ui/buttons/SignInWithButton/SignInWithButton';
import Input from '@/components/ui/fields/Input/Input';
import { useAuth } from '@/hooks/useAuth';
import type { IAuthForm, IAuthFormProps } from '@/types/ui/auth-form.interface';

import styles from './auth-form.module.scss';

const AuthForm = ({ type, navigateTo }: IAuthFormProps) => {
	const { handleSubmit, control } = useForm<IAuthForm>({
		mode: 'onSubmit'
	});

	const { signIn, signUp, signInWithGoogle } = useAuth();

	const navigate = useNavigate();

	const isLogin = type === 'login';

	const onSubmit: SubmitHandler<IAuthForm> = async data => {
		if (isLogin) {
			return await signIn(data.email, data.password).then(() =>
				navigate(navigateTo)
			);
		}
		return await signUp(data.email, data.password, data.nickname!).then(() =>
			navigate(navigateTo)
		);
	};

	const googleAuth = async () => {
		signInWithGoogle();
	};

	// Текста
	const submitButtonText = isLogin ? 'Войти' : 'Зарегистрироваться';
	const linkText = isLogin ? 'Зарегистрироваться' : 'Войти в аккаунт';
	const linkTo = isLogin ? '/sign-up' : '/login';

	return (
		<div className={styles.container}>
			<div className={styles.modal}>
				<h1 className={styles.title}>
					{type === 'login' ? 'Логин' : 'Регистрация'}
				</h1>
				<div className={styles.google}>
					<SignInWithButton
						iconPath={googleIcon}
						title='Войти через google'
						className='mb-4'
						animate={true}
						onClick={googleAuth}
					/>
				</div>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						name='email'
						rules={{
							required: 'Поле Email обязательное!',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Неверный email!'
							}
						}}
						render={({ field, fieldState }) => {
							return (
								<Input
									{...field}
									label='Email'
									type='text'
									value={field.value ?? ''}
									error={fieldState?.error?.message}
									className={fieldState?.error?.message && 'mb-3'}
								/>
							);
						}}
					/>
					<Controller
						control={control}
						name='password'
						rules={{
							required: 'Поле Пароль обязательное!',
							minLength:
								type === 'register'
									? {
											value: 6,
											message: 'Пароль слишком слабый!'
										}
									: undefined
						}}
						render={({ field, fieldState }) => {
							return (
								<Input
									{...field}
									label='Пароль'
									type='password'
									error={fieldState?.error?.message}
									value={field.value ?? ''}
									className={
										fieldState?.error?.message && !isLogin ? 'mb-3' : ''
									}
								/>
							);
						}}
					/>

					{!isLogin && (
						<Controller
							control={control}
							name='nickname'
							rules={{
								required: 'Поле Никнейм обязательное!'
							}}
							render={({ field, fieldState }) => {
								return (
									<Input
										{...field}
										label='Никнейм'
										type='text'
										value={field.value ?? ''}
										error={fieldState?.error?.message}
									/>
								);
							}}
						/>
					)}
					<Button
						type='submit'
						title={submitButtonText}
						className='mt-4'
						// colorTheme='light'
					/>
				</form>
				<div className={styles.text}>
					{isLogin ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
					<Link to={linkTo}>{linkText}</Link>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
