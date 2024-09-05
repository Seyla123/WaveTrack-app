import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material/styles";

// Define the theme
let theme = createTheme({
    palette: {
        primary: {
            main: "#2196F3",
        },
        secondary: {
            main: "#dc004e",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
        // Define other typography settings as needed
    },

    // Toolpad dashboard layout
    cssVariables: {
        colorSchemeSelector: "data-toolpad-color-scheme",
    },
    colorSchemes: { light: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: "#2196F3",
        },
        secondary: {
            main: "#dc004e",
        },
    },
    typography: {
        fontFamily: "Roboto, sans-serif",
        // Define other typography settings as needed
    },
  
  typography: {
    fontFamily: 'Roboto, sans-serif',
    // Define other typography settings as needed
    h4:{
      fontSize: '32px',
    }
  },
    shadows: {
        1: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        2: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;
