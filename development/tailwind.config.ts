import type { Config } from "tailwindcss";

export default {
    content: ["./templates/*.html", "./src/**/*.{html,js,ts}"],
    theme: {
        extend: {
            colors: {
                // primary: "#636AE8",
                primary: "#7A95E3",
                "primary-text": "#7A95E3",
                "primary-hover": "#899fe2",
                grey: "#B9BBC1",
                dark: "#414451",
                secondary: "#565E6CFF",
                tertiary: "#e8e8e8",
                heading: "#242524FF",
                "danger-hover": "#cc0000",
            },
        },
    },
    plugins: [],
} satisfies Config;
