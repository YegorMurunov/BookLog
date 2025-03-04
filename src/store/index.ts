import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { booksApi } from './api/books-api';
import authReducer from './slices/auth/auth.slice';
import deleteModalReducer from './slices/delete-modal/delete-modal.slice';
import modalReducer from './slices/modal/modal.slice';
import sidebarReducer from './slices/sidebar/sidebar.slice';
import tableFiltersReducer from './slices/table/table-filters.slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
		[booksApi.reducerPath]: booksApi.reducer,
		bookModal: modalReducer,
		deleteModal: deleteModalReducer,
		tableFilters: tableFiltersReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			booksApi.middleware
		),
	devTools: true
});

// refetch on focus / refetch on reconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
