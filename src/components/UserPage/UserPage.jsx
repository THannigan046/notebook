import {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import {Typography, TableContainer, Paper} from '@mui/material'
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

  // this component doesn't do much to start, just renders some user reducer info to the DOM
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
      <TableContainer component={Paper}  >
        {/* <div style={{ height: 400, width: '100%', alignContent: 'center' }}> */}
          <DataGrid
            sx={{ m: 2, boxShadow: 2 }}
            aria-label="a dense table"
            rows={dataGridRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        {/* </div> */}
      </TableContainer>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
