import {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {Typography, TextField, Checkbox, Slider, Button, TableContainer, Box, Paper} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

function UserPage() {

  const dispatch = useDispatch();
  const [petName, setPetName] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(petName)

    dispatch({
      type : 'ADD_PET',
      payload: {
        name : petName
      }
    })
  }

  const columns = [
    { field: 'lastName', headerName: 'Last Name', minWidth: 130, flex: 0.8 },
    { field: 'firstName', headerName: 'First Name', minWidth: 120, flex: 0.8 },
    { field: 'email', headerName: 'email', minWidth: 220, flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone', minWidth: 130, flex: 0.8 },
    { field: 'clientName', headerName: 'Client Name', minWidth: 130, flex: 0.8 },

  ]

  const dataGridRows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon'},
  ]


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
      <Button>Add Task</Button>
    </Box>
    
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        {/* Row 1: Text */}
        <Paper sx={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
          <Typography variant="body1">Row 1: Text Input</Typography>
          <TextField fullWidth label="Enter text" variant="outlined" />
        </Paper>

        {/* Row 2: Number */}
        <Paper sx={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
          <Typography variant="body1">Row 2: Number Input</Typography>
          <TextField fullWidth label="Enter a number" variant="outlined" type="number" />
        </Paper>

        {/* Rows 3-9: Checkboxes */}
        {[3, 4, 5, 6, 7, 8, 9].map((row) => (
          <Paper key={row} sx={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
            <Typography variant="body1">Row {row}: Checkbox</Typography>
            <Checkbox />
          </Paper>
        ))}

        {/* Row 10: Percentage */}
        <Paper sx={{ width: '100%', padding: '16px', marginBottom: '8px' }}>
          <Typography variant="body1">Row 10: Percentage</Typography>
          <Slider
            valueLabelDisplay="auto"
            value={50}
            aria-labelledby="input-slider"
          />
        </Paper>
      </Box>

    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
