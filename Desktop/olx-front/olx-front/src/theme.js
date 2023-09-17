import { createTheme } from "@mui/material";


export const shades = {
    primary: {
        100: "#d3d4d4",
        200: "#a7a9a9",
        300: "#7c7d7e",
        400: "#505253",
        500: "#242728",
        600: "#1d1f20",
        700: "#161718",
        800: "#0e1010",
        900: "#070808"
    },
    secondary: {
        100: "#fff0df",
        200: "#ffe1bf",
        300: "#fed39f",
        400: "#fec47f",
        500: "#feb55f",
        600: "#cb914c",
        700: "#986d39",
        800: "#664826",
        900: "#332413"
    },
    neutral: {
        100: "#e1e0e0",
        200: "#c3c1c1",
        300: "#a4a3a3",
        400: "#868484",
        500: "#686565",
        600: "#535151",
        700: "#3e3d3d",
        800: "#2a2828",
        900: "#151414"
},

};

export const theme = createTheme({
    palette:{
        primary:{
            main:shades.primary[500],
            light:shades.primary[100],
            dark:shades.primary[900]
        },
        secondary:{
            main:shades.secondary[500],
            light:shades.secondary[100],
            dark:shades.secondary[900]
        },
        neutral:{
            main:shades.neutral[500],
            light:shades.neutral[100],
            dark:shades.neutral[900]
        }
    }
});