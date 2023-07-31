'use client';

import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';



export const ThemeContext = ({ children }) => {
    const prefersDark = useMediaQuery('@media (prefers-color-scheme: dark)');

    const theme = createTheme({
        palette: {
            mode: prefersDark ? 'dark' : 'light',
        },
        components: {
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true,
                    disableTouchRipple: true,
                },
            },
        },
    });

    return (
        <ThemeProvider theme={responsiveFontSizes(theme)}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}; 