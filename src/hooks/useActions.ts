import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { actions as authActions } from '@/store/slices/auth/auth.slice';
import { actions as deleteModalActions } from '@/store/slices/delete-modal/delete-modal.slice';
import { actions as modalActions } from '@/store/slices/modal/modal.slice';
import { actions as sidebarActions } from '@/store/slices/sidebar/sidebar.slice';
import { actions as tableFiltersActions } from '@/store/slices/table/table-filters.slice';
import { bindActionCreators } from '@reduxjs/toolkit';

const rootActions = {
	...authActions,
	...sidebarActions,
	...modalActions,
	...deleteModalActions,
	...tableFiltersActions
};

export const useActions = () => {
	const dispatch = useDispatch();

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
