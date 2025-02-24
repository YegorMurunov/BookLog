import { LucideIcon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

import { TPlaceTooltip } from './tooltip.interface';

// Button component
export type TButtonType = 'submit' | 'reset' | 'button';
export type TButtonColorTheme = 'default' | 'dark' | 'light';
export type TButtonVariant = 'default' | 'outlined';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type: TButtonType;
	className?: string;
	title: string;
	colorTheme?: TButtonColorTheme;
	variant?: TButtonVariant;
}

// SignInWithButton component
export type TSignInWithButtonColorTheme = Exclude<TButtonColorTheme, 'default'>;

export interface ISignInWithButtonProps extends Omit<IButtonProps, 'type'> {
	colorTheme?: TSignInWithButtonColorTheme;
	iconPath: string;
	animate?: boolean;
}

export interface IButtonWithIconProps extends IButtonProps {
	icon: LucideIcon;
}

export interface IIconButton extends IButtonWithIconProps {
	tooltipPos: TPlaceTooltip;
}
