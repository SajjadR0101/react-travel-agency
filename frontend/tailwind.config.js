/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tailwind-datepicker-react/dist/**/*.js"],
    theme: {
        extend: {
            fontFamily: {
                TradeGothic: ["TradeGothic", "sans-sarif"],
                Montserrat: ["Montserrat", "sans-sarif"],
                MontserratMedium: ["Montserrat Medium", "sans-sarif"],
                MontserratSemiBold: ["Montserrat SemiBold", "sans-sarif"],
                MontserratBold: ["Montserrat Bold", "sans-sarif"],
            },
            fontSize: {
                xxs: "0.625rem",
                "3xl": "2rem",
                "5xl": "2.5rem",
            },
            colors: {
                primary: "#8DD3BB",
                "primary-hover": "#9BE0C8",
                "green-black": "#112211",
                "low-green": "#CDEAE1",
                'error': '#FD736E'
            },
            container: {
                center: true,
                padding: "1rem",
            },
            spacing: {
                4.5: "1.125rem",
                13: "3.25rem"
            },
            boxShadow: {
                card: "0 4px 16px rgba(17, 34, 17, 0.05)",
                box: "0 2px 10px rgba(0, 0, 0, 0.05);",
                normal: "0 4px 16px rgba(141, 211, 187, 0.15)"
            },
            borderRadius: {
                "2.5xl": "1.25rem",
            },
            backgroundImage: {
                'landing': 'linear-gradient(0, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%), url("/images/backgrounds/landing_header.webp")',
                'prefect_1': 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(18, 18, 18, 0.5) 100%), url("/images/backgrounds/plan_flights.webp")',
                'prefect_2': 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(18, 18, 18, 0.5) 100%), url("/images/backgrounds/plan_hotel.webp")',
                'user_panel': 'linear-gradient(45deg, rgba(20,83,100,1) 0%, rgba(20,83,100,1) 35%, rgba(253,112,59,1) 35%, rgba(253,154,60,1) 50%, rgba(253,112,59,1) 50%, rgba(253,154,60,1) 86%, rgba(253,202,59,1) 86%, rgba(253,202,59,1) 100%)',
                'flights_search': 'linear-gradient(90deg, rgba(0, 35, 77, 0.63) 11.46%, rgba(0, 35, 77, 0.00) 77.37%), url("/images/flights/flights_header.jpg")',
                'hotel_search': 'linear-gradient(90deg, rgba(0, 35, 77, 0.63) 11.46%, rgba(0, 35, 77, 0.00) 77.37%), url("/images/hotel/hotel_header.jpg")',
            },
            screens: {
                'xs': '420px',
            },
            animation: {
                'loadByOpacity': 'loadByOpacity .3s forwards ease-in-out',
                'ziroToFull': 'widthZiroToFull 3s forwards ease-in-out',
                'scale': 'scale .35s forwards ease-in-out',
                'full-scale': 'fullScale .3s forwards ease-in-out',
            }
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant("child", "& > *"); // & > * a selector to select all child
            addVariant("child-hover", "& > *:hover");
        },
    ],
};
