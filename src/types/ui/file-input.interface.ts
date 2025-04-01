export interface IFileInputProps {
	name: string;
	placeholder?: string;
	className?: string;
	error?: string | null;
	disabled?: boolean;
	onChange: (file: File | null) => void;
	accept?: string;
}
