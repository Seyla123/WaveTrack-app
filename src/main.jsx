import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import App from './App';
import store from './store/store';
import theme from './styles/theme';
import './styles/global.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <Router>
                    <App />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>
);
