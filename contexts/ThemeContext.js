import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode colors
            primary: {
              main: '#0098e5',
              light: '#4db8ff',
              dark: '#006ba6',
            },
            secondary: {
              main: '#44596e',
              light: '#6b7f94',
              dark: '#2d3d4f',
            },
            background: {
              default: '#f5f8fa',
              paper: '#ffffff',
            },
            text: {
              primary: '#1a202c',
              secondary: '#4a5568',
            },
            divider: 'rgba(0, 0, 0, 0.12)',
          }
        : {
            // Dark mode colors - Professional modern palette
            primary: {
              main: '#2196f3',
              light: '#42a5f5',
              dark: '#1976d2',
            },
            secondary: {
              main: '#90caf9',
              light: '#bbdefb',
              dark: '#42a5f5',
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0b0b0',
            },
            divider: 'rgba(255, 255, 255, 0.12)',
            action: {
              hover: 'rgba(255, 255, 255, 0.08)',
              selected: 'rgba(255, 255, 255, 0.16)',
            },
          }),
    },
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            ...(mode === 'dark' && {
              backgroundColor: '#1e1e1e',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
            }),
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              ...(mode === 'dark' && {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2196f3',
                },
              }),
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              borderColor: 'rgba(255, 255, 255, 0.23)',
            }),
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }),
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
