import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { booksApi } from './api/books-api';
import authReducer from './slices/auth/auth.slice';
import booksReducer from './slices/books/books.slice';
import modalReducer from './slices/modal/modal.slice';
import sidebarReducer from './slices/sidebar/sidebar.slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarReducer,
		[booksApi.reducerPath]: booksApi.reducer,
		books: booksReducer,
		modal: modalReducer
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
