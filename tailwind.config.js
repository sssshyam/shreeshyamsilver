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
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                },
                accent: {
                    DEFAULT: '#D97706', // Amber-600 - Traditional Rajasthani gold
                    light: '#F59E0B',   // Amber-500
                    dark: '#B45309',    // Amber-700
                },
                rajasthan: {
                    gold: '#DAA520',
                    orange: '#FF6B35',
                    amber: '#FDC830',
                    terracotta: '#E07A5F',
                    desert: '#FFFBEB',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
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
