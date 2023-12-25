import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#8DD3BB'
        }
    },
});

export default function PriceRangeFilterProduct({ onChange }) {
    const [value, setValue] = useState([50, 1200]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange(newValue)
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className="py-4 px-6">
                <Slider color="primary" step={50} min={50} max={1200} value={value} onChange={handleChange} />
                <div className="font-MontserratMedium text-sm flex justify-between">
                    <span>${value[0]}</span>
                    <span>${value[1]}</span>
                </div>
            </Box>
        </ThemeProvider>
    );
}
