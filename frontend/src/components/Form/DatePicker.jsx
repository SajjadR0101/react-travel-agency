import { memo, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: ["montserrat medium"].join(","),
    },
    palette: {
        primary: {
            main: "#3b82f6",
            dark: "#3b82f6",
        },
        secondary: {
            main: "#3b82f6",
        },
    },
});

dayjs.extend(localizedFormat);

export default memo(function AppDatePicker({ onSubmit, onCancel, orientation = "portrait" }) {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    orientation={orientation}
                    className="shadow-box text-slate-600 rounded-lg"
                    onChange={(result) => {
                        !result && onCancel();
                    }}
                    onAccept={(result) => onSubmit(dayjs(result.$d).format("ll"))}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
});
