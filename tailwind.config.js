/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0061FF',
                    foreground: '#FFFFFF',
                },
                secondary: {
                    DEFAULT: '#FF6600',
                    foreground: '#FFFFFF',
                },
                // Add more custom colors as needed based on the design
            },
            fontFamily: {
                'nunito-regular': ['Nunito_400Regular'],
                'nunito-medium': ['Nunito_500Medium'],
                'nunito-semibold': ['Nunito_600SemiBold'],
                'nunito-bold': ['Nunito_700Bold'],
                'nunito-extrabold': ['Nunito_800ExtraBold'],
            }
        },
    },
    plugins: [],
}
