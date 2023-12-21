/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'weather-primary': '#0af',
                'weather-secondary': '#707070',
            },
        },
        fontFamily: {},
        container: {
            center: true,
            padding: '2rem',
        },
        screens: {
            sm: '480px',
            md: '768px',
        },
    },
    plugins: [],
}
