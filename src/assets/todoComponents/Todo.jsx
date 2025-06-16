import React, { useEffect, useMemo } from 'react';
import Task from './Task';
import { Button, Typography, Divider, ToggleButtonGroup, ToggleButton, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Container, } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import TodoContext from '../context/TodoContext';
import SnackbarContext from '../context/SnackbarContext';

const Todo = () => {
  const [inputValue, setInputValue] = React.useState(''); // State to hold tasks
  const { tasks, setTasks } = React.useContext(TodoContext); // Accessing context for tasks
  const { handleOpenSnackbar, setMessage } = React.useContext(SnackbarContext); // Accessing context for snackbar handling
  const [alignment, setAlignment] = React.useState('all'); // State for toggle button alignment
  const [taskIdForDelete, setTaskIdForDelete] = React.useState(null); // State to hold the current task for deletion
  const [editTask, setEditTask] = React.useState({}); // State to hold the task being edited

  const handleClick = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: uuidv4(), 
        title: inputValue.trim(), 
        completed: false 
      }
      const updatedTasks = [...tasks, newTask]; 
      setTasks(updatedTasks); 
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
      setInputValue(''); 
      handleOpenSnackbar();
      setMessage('تمت إضافه التسكاية بنجاح'); // Show success message
    } else {
      alert('اكتب المهمة ي زميللي'); 
    }
  };

  // Filter for non-completed tasks
  const nonCompletedTasks = useMemo(() => {
    return Array.isArray(tasks) ? tasks.filter(task => !task.completed) : [];
  }, [tasks]);

  // Filter for completed tasks
  const completedTasks = useMemo(() => {
    return Array.isArray(tasks) ? tasks.filter((task) => task.completed) : []
  }, [tasks]); 
  
  // Function to handle toggle button changes
  let itemsToBeRender = tasks;
  if (alignment == 'nonCompleted') {
    itemsToBeRender = nonCompletedTasks;
  }else if (alignment == 'completed') {
    itemsToBeRender = completedTasks; 
  }else {
    itemsToBeRender = tasks; // Show all tasks
  }
  
  // retrieve tasks from context and render them
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, [setTasks]);
 
  // { OPEN DELETE DIALOG }
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const showDeleteDialog = (taskIdForDelete) => {
      setTaskIdForDelete(taskIdForDelete); 
      setOpenDeleteDialog(true);
    }

    const handleDelete = () => {
      const updatedTasks = tasks.filter((t) => t.id !== taskIdForDelete); // Filter out the task to be deleted
      setTasks(updatedTasks); 
      setOpenDeleteDialog(false);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
      handleOpenSnackbar();
      setMessage('تمت مسح التسكاية بنجاح'); 
    }
  // { ==== OPEN DELETE DIALOG ==== }

  // {  OPEN EDIT DIALOG  }
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        handleOpenSnackbar();
        setMessage('تم تعديل التسكاية بنجاح');
    };
    const showOpenEditDialog = (editTaskId, editTaskTitle) => {
      setOpenEditDialog(true);
      setEditTask({id: editTaskId, title: editTaskTitle}); 
      
    }
  // { ==== OPEN EDIT DIALOG ==== }

    
  const renderedTasks = itemsToBeRender?.map?.((task) => (
    <Task
      key={task.id}
      task={task}
      showDeleteDialog={showDeleteDialog}
      showOpenEditDialog={showOpenEditDialog}
    />
  ));

  return (
    <>
    {/* OPEN DELETE DIALOG */}
    <Dialog
        dir='rtl'
        fullWidth
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
      {" متأكد انك عاوز تمسح المهمة دي؟"}
      </DialogTitle>
      <DialogContent>
      <DialogContentText id="alert-dialog-description">
          مش هتعرف ترجعها تاني لو مسحتها
      </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button onClick={handleCloseDeleteDialog}>لا</Button>
      <Button onClick={handleDelete} autoFocus>
          شييل ي زميللي
      </Button>
      </DialogActions>
    </Dialog>
    {/*==== OPEN DELETE DIALOG ====*/}

    {/* OPEN EDIT DIALOG */}
    <Dialog
        dir='rtl'
        fullWidth
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="edit-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">قائمة للتعديل</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="title"
          label="التسكاية "
          type="text"
          fullWidth
          variant="standard"
          value={editTask.title}
            onChange={(e) => {
            const newTitle = e.target.value;
            setEditTask((prev) => ({ ...prev, title: newTitle }));

            const updatedTasks = tasks.map((t) => {
              if (t.id === editTask.id) {
                return { ...t, title: newTitle };
              }
              return t;
            });
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          }} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditDialog}>كله تمام كداا</Button>
      </DialogActions>
    </Dialog>
    {/*==== OPEN EDIT DIALOG ====*/}

    <Card className='todoResponsive' sx={{padding: '10px', textAlign: 'center', width: '100%', maxWidth: '600px', boxShadow: '0 2px 5px rgba(88, 88, 88, 0.63)'}}>
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
          <ToggleButton value="completed">المنجزة</ToggleButton>
          <ToggleButton value="all">كله</ToggleButton>
        </ToggleButtonGroup> 

        {/* Task List will be rendered here */}
        <Container sx={{margin: '20px 5px 0px 20px'}}>
          {tasks.length > 0 ? <Container style={{maxHeight: '50vh',scrollBehavior: 'smooth', overflowY: 'auto'}}>{renderedTasks}</Container> : <Typography sx={{color: 'gray'}}>مفيش تسكاات ي زميللي</Typography>}
        </Container>

        <Grid container spacing={1} >
          <Grid size={ 4 }>
            <Button onClick={handleClick} fullWidth size='large' variant="contained">زود</Button>
          </Grid>
          <Grid size={ 8 }>
            <TextField fullWidth value={inputValue} onChange={(e) => setInputValue(e.target.value)} size='small' label=" التاسكاية" variant="outlined" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </>
  );
}

export default Todo