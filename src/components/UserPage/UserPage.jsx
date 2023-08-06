import {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {Typography, Modal, TextField, Backdrop, Checkbox, Slider, Button, TableContainer, Box, Paper} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function UserPage() {

  const dispatch = useDispatch();
  const [petName, setPetName] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (daysPerWeek > 0 || daysPerWeek < 7) {
      axios.post('/api/user/tasks', {
        taskName: taskName, daysPerWeek: daysPerWeek
      } )

      handleClose();  
    }
    else (alert('Please enter a valid number of days per week'))
    /* dispatch({
      type : 'ADD_PET',
      payload: {
        name : petName
      }
    }) */
  }

  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* const columns = [
    { field: 'lastName', headerName: 'Last Name', minWidth: 130, flex: 0.8 },
    { field: 'firstName', headerName: 'First Name', minWidth: 120, flex: 0.8 },
    { field: 'email', headerName: 'email', minWidth: 220, flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone', minWidth: 130, flex: 0.8 },
    { field: 'clientName', headerName: 'Client Name', minWidth: 130, flex: 0.8 },

  ]
  
  const dataGridRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon'},
  ] */


  const user = useSelector((store) => store.user);
  return (
    <>
    <Typography variant="h2" component="h2" align='center'>
      Welcome {user.username}
    </Typography>
    {/* rename to weeks.jsx */}
    {/* Back button to return to months page */}
    {/* Make a task */}
    {/* click a button that opens a task modal */}  
    {/* datagrid of tasks (crud stuff) with checkboxes that all feeds to database*/}
    <Box display='flex' justifyContent='center' width='100%'>
      <Button onClick={handleOpen}>Add Task</Button>
    </Box>

      <Modal closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ onClick: handleClose }} open={open} onClose={handleClose}> 
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', justifyContent:'center', height: '100%', }}>
        {/* Row 1: Text */}
        <Paper sx={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
          {/* <Typography variant="body1">Row 1: Text Input</Typography> */}
          <TextField fullWidth label="Task Name" value={taskName} onChange={e => setTaskName(e.target.value)} variant="outlined" />
        </Paper>

        {/* Row 2: Number */}
        <Paper sx={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
          {/* <Typography variant="body1">Row 2: Number Input</Typography> */}
          <TextField  value={daysPerWeek} onChange={e => setDaysPerWeek(e.target.value)} fullWidth label="Days Per Week" variant="outlined" type="number" />
        </Paper>

          <Paper sx={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
            <Box display='flex' justifyContent='center' width='100%'>
              <Button onClick={handleSubmit} variant="contained">Add Task</Button>
            </Box>
          </Paper>

      </Box>
    </Modal>

    </>
  );
}

export default UserPage;
