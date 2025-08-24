import type { IDeleteModal } from '@/types/ui/delete-modal.interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IDeleteModal = {
	id: null,
	isOpen: false,
	typeOfObject: null,
	listId: undefined
};

const deleteModalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openDeleteModal: (state, { payload }) => {
			state.isOpen = true;
			state.id = payload.id;
			state.typeOfObject = payload.typeOfObject;
			state.listId = payload.listId;
		},
		closeDeleteModal: state => {
			state.isOpen = false;
			state.id = null;
			state.listId = undefined;
		}
	}
});

export const { actions, reducer } = deleteModalSlice;

export default deleteModalSlice.reducer;
