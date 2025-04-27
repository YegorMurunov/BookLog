type TtypeOfObject = 'table' | 'goals';

export interface IDeleteModal {
	id: string | null;
	isOpen: boolean;
	typeOfObject: TtypeOfObject | null;
}
