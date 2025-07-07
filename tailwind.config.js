/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			pink: '#f97fbe',
			'pink-expressive': '#FF66AC',
			dark: '#181818',
			'light-dark': '#282828',
			white: '#ffffff',
			gray: '#d2d1d1',
			'dark-gray': '#bababa',
			'light-gray': '#f0f0f0',
			yellow: '#fbe338',
			orange: '#ffa500',
			skyblue: '#75c4fc',
			green: '#61ccad',
			red: '#fb2c36',
			transparent: 'transparent'
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif']
		},
		extend: {
			backgroundImage: {
				'linear-primary':
					'linear-gradient(135deg, rgba(231,227,201,1) 0%, rgba(198,224,211,1) 15%, rgba(189,196,221,1) 35%, rgba(254,167,212,1) 100%)'
			},
			padding: {
				container: '1rem'
			}
		}
	},
	plugins: []
};
