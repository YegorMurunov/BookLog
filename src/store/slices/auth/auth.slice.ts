import type { IUser } from '@/types/user.interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUser = {
	user: null,
	isAuth: false,
	isLoading: true
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, { payload }) {
			state.user = {
				email: payload.email,
				uid: payload.uid,
				refreshToken: payload.refreshToken,
				displayName: payload.displayName,
				photoURL: payload.photoURL || null,
				creationTime: payload.creationTime
			};
			state.isAuth = true;
			state.isLoading = false;
		},
		logoutUser(state) {
			state.user = null;
			state.isAuth = false;
			state.isLoading = false;
		},
		setLoading(state, { payload }) {
			state.isLoading = payload;
		}
	}
});

export const { actions, reducer } = authSlice;

export default authSlice.reducer;
