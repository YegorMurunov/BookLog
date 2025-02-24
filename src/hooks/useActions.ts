import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { actions as authActions } from '@/store/slices/auth/auth.slice';
import { actions as booksActions } from '@/store/slices/books/books.slice';
import { actions as modalActions } from '@/store/slices/modal/modal.slice';
import { actions as sidebarActions } from '@/store/slices/sidebar/sidebar.slice';
import { bindActionCreators } from '@reduxjs/toolkit';

const rootActions = {
	...authActions,
	...sidebarActions,
	...booksActions,
	...modalActions
};

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
