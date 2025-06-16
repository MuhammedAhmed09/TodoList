import {  ButtonGroup, Card, Grid, IconButton, useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import * as React from 'react'
import TodoContext from '../context/TodoContext';
import SnackbarContext from '../context/SnackbarContext';

const Task = ({ task, showDeleteDialog, showOpenEditDialog }) => {
    const { tasks, setTasks } = React.useContext(TodoContext);
    const { handleOpenSnackbar, setMessage } = React.useContext(SnackbarContext);

    const handleCheckClick = () => {
        // Toggle the completed status of the task
        const updatedTasks = tasks.map((t) => {
            if (t.id == task.id) {
                t.completed = !t.completed; 
            }return t;
        });
        setTasks(updatedTasks); 
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
        handleOpenSnackbar();
        setMessage(!task.completed ? 'تم إلغاء إنجاز المهمة' : 'تم إنجاز المهمة بنجاح'); 
    }

    const handleClickOpenDeleteDialog = () => {
        showDeleteDialog(task.id);
    };
    
    const handleClickOpenEditDialog = () => {
        showOpenEditDialog(task.id, task.title);
    };

    const theme = useTheme();
  return (
    <Card className='task' sx={{ direction: 'rtl', transition: '0.2s', color: theme.palette.text.secondary, bgcolor: theme.palette.backgroundTask.default, marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', ':hover': { boxShadow: '0 4px 10px rgba(0,0,0,0.2)' } }}>
        <Grid spacing={1} container pr={2} sx={{ alignItems: 'center'}}>
            <Grid size={7} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <h3>{task.title}</h3>
            </Grid>
            <Grid size={5}>
                <ButtonGroup sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', justifyItems: 'self-end'}} variant="text" aria-label="text button group">
                    <IconButton onClick={handleCheckClick} sx={{border: 'solid 3px green', bgcolor: task.completed ? 'green':'white', color: task.completed ? 'white':'green', ":hover": {bgcolor:'#ececee', boxShadow: '2', color: 'green'}}}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton  onClick={handleClickOpenEditDialog} sx={{border: 'solid 2px blue', bgcolor: 'white', color: 'blue', ":hover": {bgcolor:'#ececec', boxShadow: '2', color: 'blue'}}}>
                        <EditIcon />
                    </IconButton >
                    <IconButton  onClick={handleClickOpenDeleteDialog} sx={{border: 'solid 3px red', bgcolor: 'white', color: 'red', ":hover": {bgcolor:'#ececec', boxShadow: '2', color: 'red'}}}>
                        <DeleteIcon/>
                    </IconButton>
                </ButtonGroup>
            </Grid>
        </Grid>
    </Card>
  )
}

export default Task