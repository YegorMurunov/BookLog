import toast from 'react-hot-toast';

import { toastsMessages } from '@/configs/toasts/toasts-messages';
import { TToastType } from '@/types/toasts.interface';

export const toastWithPromise = async <T>(
	promiseFun: () => Promise<T>,
	type: TToastType
): Promise<T> => {
	return await toast.promise(promiseFun(), {
		loading: toastsMessages[type].loading,
		success: toastsMessages[type].success,
		error: err => {
			const errCode = err.code;
			return (
				toastsMessages[type].error[errCode] ||
				toastsMessages[type].error.default
			);
		}
	});
};
