/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            "2xl": { max: "1535px" },
            xl: { max: "1200px" },
            lg: { max: "992px" },
            md: { max: "768px" },
            sm: { max: "576px" },
        },
        container: {
            center: true,
            padding: "2rem",
        },
        extend: {
            colors: {
                primary1: "#3f7afe",
                primary2: "#306df5",
                gray1: "#f6f7fb",
                gray2: "#ecedf0",
            },
        },
    },
    plugins: [],
};
