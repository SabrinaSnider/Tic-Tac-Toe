import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unstable_createMuiStrictModeTheme, ThemeProvider } from '@material-ui/core/styles';

const darkTheme = unstable_createMuiStrictModeTheme ({
  palette: {
    type: 'dark',
  },
  typography: {
    fontSize: 16,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
