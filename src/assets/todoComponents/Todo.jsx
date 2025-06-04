import React, { useEffect } from 'react';
import { Button, Card, CardContent, Divider, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Task from './Task';
import { TodoContext } from '../Context';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const [inputValue, setInputValue] = React.useState(''); // State to hold tasks
  const { tasks, setTasks } = React.useContext(TodoContext); // Accessing context for tasks
  const [alignment, setAlignment] = React.useState('all'); // State for toggle button alignment
  
  const handleClick = () => {
    if (inputValue.trim() !== '') {
      // Add the new task to the tasks array
      const newTask = {
        id: uuidv4(), // Generate a unique ID for the task
        title: inputValue.trim(), // Use the trimmed input value as the task title
        completed: false 
      }
      const updatedTasks = [...tasks, newTask]; // Create a new array with the new task
      setTasks(updatedTasks); // Update the tasks state with the new task
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save tasks to local storage
      setInputValue(''); // Clear the input field after adding the task
    } else {
      alert('اكتب المهمة ي زميللي'); // Alert if input is empty
    }
  }
  // Function to handle toggle button changes
  let itemsToBeRender = tasks;
  if (alignment == 'nonCompleted') {
    itemsToBeRender = tasks.filter((task) => !task.completed); // Filter for non-completed tasks
  }else if (alignment == 'compeleted') {
    itemsToBeRender = tasks.filter((task) => task.completed); // Filter for completed tasks
  }else {
    itemsToBeRender = tasks; // Show all tasks
  }
  
  const renderedTasks = itemsToBeRender.map((task) => (
    <Task key={task.id} task={task} />
  ));
  
  // retrieve tasks from context and render them
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [setTasks]);

  return (
    
    <Card sx={{padding: '20px', textAlign: 'center', width: '100%', maxWidth: '600px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
      <CardContent>
        <Typography sx={{fontWeight: 800, fontSize: '60px'}}>
          التسكااات
        </Typography>
        <Divider sx={{marginBottom: '20px'}}/>

        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={(e) => setAlignment(e.target.value)}
          aria-label="Platform"
        >
          <ToggleButton value="nonCompleted">غير المنجزة</ToggleButton>
          <ToggleButton value="compeleted">المنجزة</ToggleButton>
          <ToggleButton value="all">كله</ToggleButton>
        </ToggleButtonGroup> 

        {/* Task List will be rendered here */}
        <Grid sx={{marginBlock: '20px'}}>
          {tasks.length > 0 ? <div style={{maxHeight: '30vw', scrollBehavior: 'smoth', overflowY: 'auto'}}>{renderedTasks}</div> : <Typography sx={{color: 'gray'}}>مفيش تسكاات ي زميللي</Typography>}
        </Grid>

        <Grid container spacing={1} >
          <Grid size={4}>
            <Button onClick={handleClick} fullWidth size='large' variant="contained">زود</Button>
          </Grid>
          <Grid size={8}>
            <TextField value={inputValue} onChange={(e) => setInputValue(e.target.value)} fullWidth size='small' label=" التاسكاية" variant="outlined" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Todo