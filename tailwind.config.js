/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                silver: {
                    50: '#F8F9FA',
                    100: '#F1F3F5',
                    200: '#E9ECEF',
                    300: '#DEE2E6',
                    400: '#CED4DA',
                    500: '#ADB5BD',
                    600: '#6C757D',
                    700: '#495057',
                    800: '#343A40',
                    900: '#212529',
                },
                accent: {
                    DEFAULT: '#6C757D', // Elegant gray
                    light: '#ADB5BD',   // Light silver
                    dark: '#495057',    // Dark gray
                },
                royal: {
                    gold: '#C9A961',    // Subtle gold accent
                    silver: '#C0C0C0', // Silver Plated
                    platinum: '#E5E4E2', // Platinum white
                }
            },
            fontFamily: {
                serif: ['Outfit', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            maxWidth: {
                '8xl': '88rem',
            }
        },
    },
    plugins: [],
}
