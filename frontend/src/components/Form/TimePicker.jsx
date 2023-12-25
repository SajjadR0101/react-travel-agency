import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["montserrat medium"].join(","),
    },
    palette: {
        primary: {
            main: '#3b82f6',
            dark: '#3b82f6'
        },
        secondary: {
            main: "#3b82f6",
        },
    },
});

export default function TimePicker({ onSubmit, onCancel }) {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticTimePicker className="shadow-box text-slate-600" onAccept={(result) => onSubmit(dayjs(result.$d).format("hh:mm a"))} onChange={result => {
                    !result && onCancel()
                }} />
            </LocalizationProvider>
        </ThemeProvider>
    );
}
