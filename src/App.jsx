import React from 'react'
import './App.css'
import { TodoContextProvider } from './assets/context/TodoContext'
import Todo from './assets/todoComponents/Todo'
import { Button, Card, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarContextProvider } from './assets/context/SnackbarContext';
import { HandymanOutlined } from '@mui/icons-material';

function App() {
  const [themeMode, setThemeMode] = React.useState(
    localStorage.getItem('themeMode') || 'light'
  );
  
  const darkTheme = createTheme({
      palette: {
        mode: themeMode,
          primary: {
            main: '#1976d2', // Primary color for buttons and highlights
          },
          backgroundTask: {
            default: themeMode === 'light' ? '#002884' : '#121212', // Default background color for tasks
          },
          background: {
            default: themeMode === 'light' ? '#f5f5f5' : '#002884', // Light background for light mode, dark for dark mode
            paper: themeMode === 'light' ? '#ffffff' : '#1e1e1e', // Paper background for cards and surfaces  
          },
          text: {
            primary: themeMode === 'light' ? '#000000' : '#ffffff', // Text color for light mode, white for dark mode
            secondary: themeMode === 'light' ? '#e0e0e0' : '#bbbbbb', // Secondary text color for light mode, light gray for dark mode
            divider: themeMode === 'light' ? '#e0e0e0' : '#333333', // Divider color for light mode, dark gray for dark mode
          },
      },
  });

  const changeThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    localStorage.setItem('themeMode', newMode);
  }

  return (
      <ThemeProvider theme={darkTheme}>
        <Button
          variant="contained" 
          color="primary" 
          startIcon={<HandymanOutlined />} 
          onClick={changeThemeMode}
          sx={{ position: 'absolute', top: 20, right: 20 }}
        >
          {themeMode === 'light' ? ' الغامق' : ' الفاتح'}
        </Button>
        
        <CssBaseline />
        <SnackbarContextProvider>
          <TodoContextProvider>  
            <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, height: '100vh' }}>    
              <Todo />
            </Card>
          </TodoContextProvider>
        </SnackbarContextProvider>
    </ThemeProvider>
  )
}

export default App
