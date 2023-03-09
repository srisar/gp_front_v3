/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ['"Sofia Sans"', "sans-serif"],
        },
        extend: {
            colors: {
                "primary-alt": "#EBF2FF",
                "primary-alt-active": "#D8E6FF",
                "secondary-alt": "#EDEDF0",
                "secondary-alt-active": "#E1E1E3",
                "accent-alt": "#ECF7ED",
                "accent-alt-active": "#DCEDDD",

                "shade": "#F7F7FA",
                "sidebar": {
                    primary: "#292A31",
                    secondary: "#19191D",
                },
            },
        },
    },

    daisyui: {
        themes: [
            {
                appTheme: {
                    "primary": "#4F91FF",
                    "secondary": "#787885",
                    "accent": "#65B168",
                    "neutral": "#19191D",
                    "base-100": "#FFFFFF",
                    "base-200": "#D2D2D6",
                    "base-300": "#5A5B6A",
                    "info": "#3ABFF8",
                    "success": "#65B168",
                    "warning": "#FB982E",
                    "error": "#F6655A",

                    "--rounded-btn": "8px",
                },
            },
        ],
    },

    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};
