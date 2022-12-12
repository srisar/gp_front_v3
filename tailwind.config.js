/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		},
		extend: {},
	},

	daisyui: {
		themes: ['emerald'],
	},

	plugins: [
		require( 'daisyui' ),
		require( '@tailwindcss/line-clamp' ),
	],
};
