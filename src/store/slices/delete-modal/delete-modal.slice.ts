import { IDeleteModal } from '@/types/ui/delete-modal.interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IDeleteModal = {
	bookId: null,
	isOpen: false
};

const deleteModalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openDeleteModal: (state, action) => {
			state.isOpen = true;
			state.bookId = action.payload;
		},
		closeDeleteModal: state => {
			state.isOpen = false;
			state.bookId = null;
		}
	}
});

export const { actions, reducer } = deleteModalSlice;

export default deleteModalSlice.reducer;
