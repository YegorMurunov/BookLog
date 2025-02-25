import path from 'path';
import { defineConfig } from 'vite';
import { ManifestOptions, VitePWA } from 'vite-plugin-pwa';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

const manifest: Partial<ManifestOptions> | false = {
	theme_color: '#f97fbe',
	background_color: '#ffffff',
	icons: [
		{
			purpose: 'maskable',
			sizes: '512x512',
			src: 'icon512_maskable.png',
			type: 'image/png'
		},
		{
			purpose: 'any',
			sizes: '512x512',
			src: 'icon512_rounded.png',
			type: 'image/png'
		}
	],
	screenshots: [
		{
			src: '/screenshots/desktop.png',
			type: 'image/png',
			sizes: '1919x869',
			form_factor: 'wide'
		},
		{
			src: '/screenshots/mobile.png',
			type: 'image/png',
			sizes: '352x761',
			form_factor: 'narrow'
		}
	],
	orientation: 'any',
	display: 'standalone',
	dir: 'ltr',
	lang: 'ru-UA',
	name: 'BookLog',
	short_name: 'BookLog',
	start_url: 'https://thebooklog.vercel.app/dashboard'
};

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{html,css,js,svg,ico,png}']
			},
			manifest: manifest
		}),
		tailwindcss()
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	}
});
