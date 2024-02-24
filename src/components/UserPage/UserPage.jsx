import { useState, useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Modal,
  TextField,
  Backdrop,
  Grid,
  Checkbox,
  Slider,
  Button,
  TableContainer,
  Box,
  Stack,
  Paper,
  InputLabel,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  useEffect(() => {
    axios.get(`/api/user/tasks/${user.id}`).then((response) => {
      dispatch({ type: "SET_TASKS", payload: response.data });
    });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/user/tasks/${user.id}`, {
      taskName: taskName,
      daysPerWeek: daysPerWeek,
    });

    handleClose();
  };

  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography variant="h2" component="h2" align="center">
        Welcome {user.username}
      </Typography>
      <CalendarSection />
      <Box  display="flex" justifyContent="center" width="100%">
        <Button sx={{ marginBottom: "20px" }} variant="outlined" onClick={handleOpen}>Add Task</Button>
      </Box>

      <Modal
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ onClick: handleClose }}
        open={open}
        onClose={handleClose}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "16px",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* Row 1: Text */}
          <Paper sx={{ width: "100%", padding: "16px", marginBottom: "8px" }}>
            {/* <Typography variant="body1">Row 1: Text Input</Typography> */}
            <TextField
              fullWidth
              label="Task Name"
              value={taskName}
              required
              onChange={(e) => setTaskName(e.target.value)}
              variant="outlined"
            />
          </Paper>
          {/* Row 2: Number */}
          <Paper sx={{ width: "100%", padding: "16px", marginBottom: "8px" }}>
            {/* <Typography variant="body1">Row 2: Number Input</Typography> */}

            {/* TODO: limit days per week between 1 and 7 */}
            {/* <TextField
              value={daysPerWeek}
              inputProps={{ inputMode: "numeric", pattern: "[1-7]*" }}
              onChange={(e) => setDaysPerWeek(e.target.value)}
              fullWidth
              label="Days Per Week"
              variant="outlined"
              type="number"
            /> */}
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Days Per Week
              </InputLabel>
              <NativeSelect
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
                defaultValue={1}
                required
                inputProps={{
                  name: "daysPerWeek",
                  id: "uncontrolled-native",
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </NativeSelect>
            </FormControl>
          </Paper>
          {/* TODO: add column stack that conditionally renders weekly tasks */}

          <Paper sx={{ width: "100%", padding: "16px", marginBottom: "8px" }}>
            <Box display="flex" justifyContent="center" width="100%">
              <Button type="submit" variant="contained">
                Add Task
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

const CalendarSection = () => {
  return (
    // TODO: center to width of nav bar
    <Stack
      direction="row"
      justifyContent="space-evenly"
      useFlexGap
      flexWrap="nowrap"
      maxWidth={"70%"}
      margin="0 auto"
    >
      <CalendarRow day={'Mon'} />
      <CalendarRow day={'Tue'} /> 
      <CalendarRow day={'Wed'} />
      <CalendarRow day={'Thu'} />
      <CalendarRow day={'Fri'} />
      <CalendarRow day={'Sat'} />
      <CalendarRow day={'Sun'} />
    </Stack>
  );
};

const CalendarRow = ({day}) => {
  const dayOfWeek = Date.now(); //or whatever
  return (
    <Stack
      direction="column"
      spacing={1}
      onClick={() => {
        //whatever
      }}
    >
      <Button onClick={() => console.log(day)} size="small" variant="outlined">{day}</Button>
      {/* <Typography variant="body1">{dayOfWeek}</Typography> */}
    </Stack>
  );
};

export default UserPage;
