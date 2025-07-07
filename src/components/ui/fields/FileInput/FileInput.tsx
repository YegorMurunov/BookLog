import clsx from 'clsx';
import { Paperclip, X } from 'lucide-react';
import { type ChangeEvent, forwardRef, useState } from 'react';

import type { IFileInputProps } from '@/types/ui/file-input.interface';

import styles from './file-input.module.scss';

const truncateFileName = (name: string, maxLength: number = 15) => {
	const lastDotIndex = name.lastIndexOf('.');
	const extension = lastDotIndex !== -1 ? name.substring(lastDotIndex) : ''; // Получаем расширение файла
	const baseName = name.substring(
		0,
		lastDotIndex !== -1 ? lastDotIndex : name.length
	); // Обрезаем основное имя без расширения

	// Если длина имени без расширения больше максимальной длины, то обрезаем основное имя
	const truncatedBaseName =
		baseName.length > maxLength - extension.length
			? baseName.substring(0, maxLength - extension.length) + '... '
			: baseName;

	return truncatedBaseName + extension; // Возвращаем имя с расширением
};

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
	(
		{
			name,
			placeholder = 'Insert File',
			className,
			error = null,
			onChange,
			// value,
			disabled,
			accept = 'all',
			...rest
		},
		ref
	) => {
		const [file, setFile] = useState<File | null>(null);

		const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
			const selectedFile = event.target.files?.[0] || null;
			setFile(selectedFile);
			onChange(selectedFile);

			if (selectedFile) {
				const reader = new FileReader();
				// reader.onload = () => setPreviewUrl(reader.result as string);
				reader.readAsDataURL(selectedFile);
			}
		};

		const handleFileClear = () => {
			setFile(null);
			onChange(null);
			if (ref && 'current' in ref && ref.current) {
				ref.current.value = '';
			}
		};

		return (
			<label
				htmlFor={name}
				className={clsx(
					styles.label,
					className,
					disabled && styles.disabled,
					error && styles.error
				)}
			>
				<div className={styles.customInput}>
					<i className={styles.icon}>
						<Paperclip />
					</i>
					{file ? truncateFileName(file.name, 25) : placeholder}
					<button
						type='button'
						className={clsx(styles.clearBtn, !file && styles.hidden)}
						onClick={handleFileClear}
					>
						<X />
					</button>
				</div>
				<input
					ref={ref}
					type='file'
					id={name}
					placeholder={placeholder}
					className={styles.input}
					disabled={disabled}
					onChange={handleFileChange}
					accept={accept}
					multiple={false}
					{...rest}
				/>
			</label>
		);
	}
);

export default FileInput;
