export const radialBarOptions = {
    chart: {
        type: "radialBar",
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1200,
        },
    },

    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "70%",
            },

            dataLabels: {
                showOn: "always",
                name: {
                    offsetY: -10,
                    show: true,
                    color: "#64748b",
                    fontSize: "13px",
                    fontFamily: "montserrat",
                },
                value: {
                    color: "#475569",
                    fontSize: "30px",
                    show: true,
                    fontFamily: "montserrat",
                },
            },
        },
    },

    colors: ["#3b82f6"],

    stroke: {
        lineCap: "round",
    },
    labels: ["Users Integrations"],
};

export const radialBarOrangeOptions = {
    chart: {
        type: "radialBar",
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1200,
        },
    },

    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "70%",
            },

            dataLabels: {
                showOn: "always",
                name: {
                    offsetY: -10,
                    show: true,
                    color: "#64748b",
                    fontSize: "13px",
                    fontFamily: "montserrat",
                },
                value: {
                    color: "#475569",
                    fontSize: "30px",
                    show: true,
                    fontFamily: "montserrat",
                },
            },
        },
    },

    colors: ["#fb923c"],

    stroke: {
        lineCap: "round",
    },
    labels: ["Flights"],
};

export const radialBarGrayOptions = {
    chart: {
        type: "radialBar",
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1200,
        },
    },

    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "70%",
            },

            dataLabels: {
                showOn: "always",
                name: {
                    offsetY: -10,
                    show: true,
                    color: "#64748b",
                    fontSize: "13px",
                    fontFamily: "montserrat",
                },
                value: {
                    color: "#475569",
                    fontSize: "30px",
                    show: true,
                    fontFamily: "montserrat",
                },
            },
        },
    },

    colors: ["#475569"],

    stroke: {
        lineCap: "round",
    },
    labels: ["Hotels"],
};

export const radialBarGreenOptions = {
    chart: {
        type: "radialBar",
        animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1200,
        },
    },

    plotOptions: {
        radialBar: {
            hollow: {
                margin: 0,
                size: "70%",
            },

            dataLabels: {
                showOn: "always",
                name: {
                    offsetY: -10,
                    show: true,
                    color: "#64748b",
                    fontSize: "13px",
                    fontFamily: "montserrat",
                },
                value: {
                    color: "#475569",
                    fontSize: "30px",
                    show: true,
                    fontFamily: "montserrat",
                },
            },
        },
    },

    colors: ["#0d9488"],

    stroke: {
        lineCap: "round",
    },
    labels: ["Newslatter"],
};

export const usersOrdersData = {
    series: [
        {
            data: [44, 55, 41, 64, 42, 43, 21],
            name: "Flights",
        },
        {
            data: [53, 22, 33, 52, 13, 54, 32],
            name: "Hotels",
        },
    ],
    options: {
        chart: {
            type: "bar",
            height: 430,
            fontFamily: "montserrat",
            toolbar: {
                show: false,
            },
        },
        labels: ["Apples", "Oranges"],
        plotOptions: {
            radar: {
                polygons: {
                    strokeColors: "#f1f5f9",
                    fill: {
                        colors: ["#f8fafc", "#fff"],
                    },
                },
            },
        },
        colors: ["#f97316", "#14b8a6"],
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                color: "#64748b",
                fontSize: "13px",
                fontFamily: "montserrat",
            },
        },
        stroke: {
            show: true,
            width: 1,
            colors: ["#fff"],
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        xaxis: {
            categories: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Friday"],
        },
    },
};

export const LatestOrdersData = {
    series: [
        {
            name: "Orders",
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        },
    ],
    options: {
        chart: {
            type: "bar",
            fontFamily: "montserrat",
            toolbar: {
                show: false,
            },
        },
        colors: ["#3b82f6"],
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["South Korea", "Canada", "United Kingdom", "Netherlands", "Italy", "France", "Japan", "United States", "China", "Germany"],
        },
    },
};
