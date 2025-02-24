import { IToastsMessages } from '@/types/toasts.interface';

export const toastsMessages: IToastsMessages = {
	login: {
		success: 'Вы успешно вошли в аккаунт! 🚀',
		loading: 'Входим в аккаунт...',
		error: {
			'auth/invalid-email': 'Некорректный email. 📧',
			'auth/user-not-found': 'Пользователь с таким email не найден. 🔍',
			'auth/invalid-credential': 'Неверные учетные данные. 🔐',
			'auth/too-many-requests':
				'Слишком много попыток входа. Попробуйте позже. ⏳',
			'auth/account-exists-with-different-credential':
				'Вы зарегистрированы через Google. Пожалуйста, войдите с помощью Google. 🙏',
			default: 'Ошибка при входе. Попробуйте еще раз. ⚠️'
		}
	},
	register: {
		success: 'Регистрация прошла успешно! 🎉',
		loading: 'Создаем аккаунт...',
		error: {
			'auth/email-already-in-use': 'Этот email уже используется. 📧',
			'auth/invalid-email': 'Некорректный email. 😟',
			'auth/weak-password': 'Слишком слабый пароль. 🏋️',
			default: 'Ошибка при регистрации. Попробуйте еще раз. ⚠️'
		}
	},
	logout: {
		success: 'Вы вышли из аккаунта. 👋',
		loading: 'Выход из аккаунта...',
		error: {
			default: 'Ошибка при выходе. Попробуйте снова. ⚠️'
		}
	},
	google: {
		success: 'Вы успешно вошли в аккаунт! 🚀',
		loading: 'Входим в аккаунт...',
		error: {
			default: 'Ошибка при входе. Попробуйте еще раз. ⚠️'
		}
	},
	addBook: {
		success: 'Вы успешно добавили книгу! 📕',
		loading: 'Добавляем книгу в библиотеку...',
		error: {
			'permission-denied': 'У вас нет прав на добавление книги. 🚫',
			unavailable: 'Сервис временно недоступен. Попробуйте позже. ⏳',
			'resource-exhausted': 'Превышен лимит базы данных. Попробуйте позже. ⏳',
			default: 'Произошла ошибка. Попробуйте еще раз. ⚠️'
		}
	},
	deleteBook: {
		success: 'Книга успешно удалена! 🗑️',
		loading: 'Удаляем книгу...',
		error: {
			'not-found': 'Книга не найдена. Возможно, она уже удалена. 🔍',
			'permission-denied': 'У вас нет прав на удаление книги. 🚫',
			unavailable: 'Сервис временно недоступен. Попробуйте позже. ⏳',
			default: 'Произошла ошибка. Попробуйте еще раз. ⚠️'
		}
	},
	editBook: {
		success: 'Данные успешно изменены! 📖',
		loading: 'Вводим изменения...',
		error: {
			'not-found': 'Книга не найдена. Возможно, она была удалена. 🔍',
			'permission-denied': 'У вас нет прав на редактирование книги. 🚫',
			'deadline-exceeded': 'Время ожидания запроса истекло. ⏳',
			default: 'Произошла ошибка. Попробуйте еще раз. ⚠️'
		}
	}
};
