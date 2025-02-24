import { IBook } from '@/types/api/books.interface';
import { IModalSlice, TModalType } from '@/types/ui/modal.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: IModalSlice = {
	book: null,
	type: 'create',
	isOpen: false
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (
			state,
			action: PayloadAction<{
				type: TModalType;
				book?: IBook;
			}>
		) => {
			state.type = action.payload.type;
			state.book = action.payload.book || null;
			state.isOpen = true;
		},
		closeModal: state => {
			state.isOpen = false;
			state.book = null;
		}
	}
});

export const { actions, reducer } = modalSlice;

export default modalSlice.reducer;
