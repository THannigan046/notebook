import { useState, useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import swal from 'sweetalert';
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
  Select,
  MenuItem,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function UserPage() {
  const dispatch = useDispatch();

  const getTasks = () => {
    axios.get(`/api/user/tasks/${user.id}`).then((response) => {
    dispatch({ type: "SET_TASKS", payload: response.data });
  });};

  const user = useSelector((store) => store.user);
  useEffect(() => {
    getTasks();
  }, []);
  // TODO: refresh tasks on post
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/user/tasks/${user.id}`, {
      taskName: taskName,
      daysPerWeek: daysPerWeek,
    }).then((response) => {
      getTasks();
    })

    handleClose();
  };

  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const tasks = useSelector((store) => store.tasks);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2" align="center">
            Welcome {user.username}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CalendarSection />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: "20px" }}>
          <Box display="flex" justifyContent="center" width="100%">
            <Button onClick={handleOpen}>Add Task</Button>
          </Box>
        </Grid>

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

              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Days Per Week
                </InputLabel>
                <Select
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  defaultValue={1}
                  required
                  inputProps={{
                    name: "daysPerWeek",
                    id: "uncontrolled-native",
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
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
        {tasks.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h3" component="h3" align="center">
                Tasks
              </Typography>
            </Grid>
            <Grid item xs={12}>
            {/* TODO: custom data grid*/}
          <Stack direction="row" justifyContent="space-evenly" useFlexGap>
            <TaskGrid />
      </Stack>
            </Grid>
          </>
        )}
      </Grid>
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
      <CalendarRow day={"Mon"} dayToSend={"monday"}/>
      <CalendarRow day={"Tue"} dayToSend={"tuesday"}/>
      <CalendarRow day={"Wed"} dayToSend={"wednesday"}/>
      <CalendarRow day={"Thu"} dayToSend={"thursday"} />
      <CalendarRow day={"Fri"} dayToSend={"friday"} />
      <CalendarRow day={"Sat"} dayToSend={"saturday"} />
      <CalendarRow day={"Sun"} dayToSend={"sunday"} />
    </Stack>
  );
};

const TaskGrid = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);
  return (
    <Grid item xs={10}>
      {/* headers */}
      <Stack direction="row" justifyContent="space-between" useFlexGap>
        <Typography variant="h5" component="h5">
          Y/N
        </Typography>
        <Typography variant="h5" component="h5">
          Task Name
        </Typography>
        <Box paddingRight={3}>
          <Typography variant="h5" component="h5">
            DPW
          </Typography>
        </Box>
      </Stack>
      <Grid item xs={10}>
        {tasks?.map((task, i) => (
          <Stack direction="row" justifyContent="space-between" useFlexGap>
            <>
              {/* onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task })} */}
              <Checkbox />
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "33vw",
                }}
                variant="h5"
                component="h5"
              >
                {task.name}
              </Typography>
              <Typography variant="h5" component="h5">
                {task.days_per_week}
              </Typography>
            </>
          </Stack>
        ))}
      </Grid>
    </Grid>
  );
};

const CalendarRow = ({ day, dayToSend }) => {
  const dispatch = useDispatch();
  const dayOfWeek = Date.now(); //or whatever
  return (
    <Stack
      direction="column"
      spacing={1}
      onClick={() => {
        //whatever
      }}
    >
      <Button onClick={() => dispatch({ type: 'SET_SELECTED_DAY', payload: dayToSend })} size="small" variant="outlined">
        {day}
      </Button>
      {/* <Typography variant="body1">{dayOfWeek}</Typography> */}
    </Stack>
  );
};

export default UserPage;
