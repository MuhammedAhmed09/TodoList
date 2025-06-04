import './App.css'
import { useState } from 'react'
import { TodoContext } from './assets/Context'
import Todo from './assets/todoComponents/Todo'
import { Button, Card, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { HandymanOutlined } from '@mui/icons-material';

function App() {
  // State to hold the list of tasks
  // This will be shared with the Todo component via context
    const [tasks, setTasks] = useState([]);
    
    // handle theme switching
    const [themeMode, setThemeMode] = useState('light');
    

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
      },
      divider: themeMode === 'light' ? '#e0e0e0' : '#333333', // Divider color for light mode, dark gray for dark mode
    },
    
  });

  return (
     <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TodoContext.Provider value={{ tasks, setTasks }}>  
        <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2, bgcolor: '#333', height: '100vh' }}>    
          <Todo />
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<HandymanOutlined />} 
            onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
            sx={{ position: 'absolute', top: 20, right: 20 }}
          >
            {themeMode === 'light' ? ' الغامق' : ' الفاتح'}
          </Button>
        </Card>
      </TodoContext.Provider>
    </ThemeProvider>
  )
}

export default App
