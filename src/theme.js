// src/theme.js
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c34117',   // your custom orange-red
    },
    secondary: {
      main: '#121063',   // your custom deep blue
    },
    // Optional: extend with other custom colors
    customAmber: {
      main: '#ffbf00',
    },
  },
});

export default theme;