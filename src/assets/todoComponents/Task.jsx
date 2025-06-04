import { Button, ButtonGroup, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField, useTheme } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import * as React from 'react';
import { TodoContext } from '../Context';

const Task = ({ task }) => {
    const { tasks, setTasks } = React.useContext(TodoContext);

    const handleCheckClick = () => {
        // Toggle the completed status of the task
        const updatedTasks = tasks.map((t) => {
            if (t.id == task.id) {
                t.completed = !t.completed; // Toggle the completed status
            }return t;
        });
        setTasks(updatedTasks); // Update the tasks state with the modified task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to local storage
    }


    // { OPEN DELETE DIALOG }
    // Function to handle opening the delete dialog
        const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
        const handleClickOpenDeleteDialog = () => {
            setOpenDeleteDialog(true);
        };
        // Function to handle closing the delete dialog
        const handleCloseDeleteDialog = () => {
            setOpenDeleteDialog(false);
        };

        // Function to handle the deletion of the task
        const handleDelete = () => {
                    // Handle the logic for deleting the task here
            const updatedTasks = tasks.filter((t) => t.id !== task.id); // Filter out the task to be deleted
            setTasks(updatedTasks); // Update the tasks state with the remaining tasks
            localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to local storage
        }
    // { ==== OPEN DELETE DIALOG ==== }
    // {  OPEN EDIT DIALOG  }
    // Functionality for editing the task can be added here
        const [openEditDialog, setOpenEditDialog] = React.useState(false);
        // Function to handle opening the edit dialog
        const handleClickOpenEditDialog = () => {
            setOpenEditDialog(true);
        };
        // Function to handle closing the edit dialog
        const handleCloseEditDialog = () => {
            setOpenEditDialog(false);
        };
    // { ==== OPEN EDIT DIALOG ==== }
            
    const theme = useTheme();
  return (
    <Card className='task' sx={{ direction: 'rtl', transition: '0.2s', color: theme.palette.text.secondary, bgcolor: theme.palette.backgroundTask.default, marginBottom: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', ':hover': { boxShadow: '0 4px 10px rgba(0,0,0,0.2)' } }}>
        <Grid spacing={2} container sx={{padding: '10px', alignItems: 'center'}}>
            <Grid size={8} sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <h3>{task.title}</h3>
            </Grid>
            <Grid size={4}>
                <ButtonGroup sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton onClick={handleCheckClick} sx={{border: 'solid 3px green', bgcolor: task.completed ? 'green':'white', color: task.completed ? 'white':'green', ":hover": {bgcolor:'#ececee', boxShadow: '2', color: 'green'}}}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton  onClick={handleClickOpenEditDialog} sx={{ marginInline: '10px',border: 'solid 3px blue', bgcolor: 'white', color: 'blue', ":hover": {bgcolor:'#ececec', boxShadow: '2', color: 'blue'}}}>
                            <EditIcon />
                        </IconButton >
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
                                    value={task.title}
                                    onChange={(e) => {
                                        const updatedTasks = tasks.map((t) => {
                                            if (t.id === task.id) {
                                                return { ...t, title: e.target.value }; // Update the title of the task
                                            }
                                            return t; // Return the task unchanged if it's not the one being edited
                                        });
                                        setTasks(updatedTasks); // Update the tasks state with the modified task
                                        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks to local storage
                                    }} // Handle the change event to update the task title
                                />
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={handleCloseEditDialog}>كله تمام كداا</Button>
                                </DialogActions>
                            </Dialog>
                            {/*==== OPEN EDIT DIALOG ====*/}
                        <IconButton  onClick={handleClickOpenDeleteDialog} sx={{border: 'solid 3px red', bgcolor: 'white', color: 'red', ":hover": {bgcolor:'#ececec', boxShadow: '2', color: 'red'}}}>
                            <DeleteIcon/>
                        </IconButton>
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
                </ButtonGroup>
            </Grid>
        </Grid>
    </Card>
  )
}

export default Task