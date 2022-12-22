/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			sans: ['Lexend', 'sans-serif'],
		},
		extend: {},
	},

	daisyui: {
		themes: ['corporate'],
	},

	plugins: [
		require( 'daisyui' ),
		require( '@tailwindcss/line-clamp' ),
	],
};
