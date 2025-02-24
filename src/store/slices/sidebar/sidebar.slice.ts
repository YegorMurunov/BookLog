import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isCollapsed: false,
	isTablet: false,
	isMobile: false
};

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: initialState,
	reducers: {
		toggleCollapse(state) {
			state.isCollapsed = !state.isCollapsed;
			localStorage.setItem('isCollapsed', JSON.stringify(state.isCollapsed));
		},
		setCollapsedState(state, { payload }) {
			state.isCollapsed = payload;
		},
		setIsTablet(state, { payload }) {
			state.isTablet = payload;
		},
		setIsMobile(state, { payload }) {
			state.isMobile = payload;
		}
	}
});

export const { actions, reducer } = sidebarSlice;

export default sidebarSlice.reducer;
