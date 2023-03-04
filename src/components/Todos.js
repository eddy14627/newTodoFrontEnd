import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import Chart from "./widgets/Chart";
import DateTab from "./widgets/Date/DateTab";
import { setCountTasks, setList, taskManager } from "../state";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import NewTask from "./widgets/NewTask";
import Filter from "./widgets/Date/Filter";
import AttachLink from "./widgets/AttachLink";
import AttachPhotoLink from "./widgets/AttachPhotoLink";

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const Todos = () => {
  let today = new Date();
  const taskId = today;
  let year = today.getFullYear();
  let month = today.getMonth() + 1; // Add 1 because getMonth() returns a zero-based index
  let day = today.getDate();
  let dayOfWeekName = daysOfWeek[today.getDay()];
  const thisDaty = `${day}-${month}-${year}`;

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [arrChange, setArrChange] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openPhotoLink, setOpenPhotoLink] = useState(false);
  const { drawer, tasks, link, photo, arr } = useSelector(
    (state) => state.reducer
  );
  const format = "format";
  useEffect(() => {
    fetchData();
    countTask();
  }, [arr]);

  const countTask = async () => {
    const response = await fetch(`http://localhost:3001/countTask`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCountTasks(data));
  };

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3001`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setList(data));
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    setInput("");
    const SendingData = {
      act: "addTodo",
      link,
      picturePath: photo,
      taskId,
      day,
      month,
      year,
      task: input,
    };
    console.log(SendingData);
    dispatch(taskManager(SendingData));
  };

  const handleAddPhoto = async () => {
    console.log("phot add");
    setOpenPhotoLink(!openPhotoLink);
  };
  const handleAddLink = async () => {
    console.log("link add");
    setOpenLink(!openLink);
  };

  return (
    <Box
      style={{
        transition: "margin-left 0.2s",
        marginLeft: drawer ? "240px" : "0",
      }}
      display="flex"
      justifyContent="flex-start"
      paddingLeft={20}
      flexDirection="column"
    >
      <Box
        style={{
          marginBottom: "20px",
        }}
      >
        <Chart format={format} value={arr} arrChange={arrChange} />
      </Box>
      <Filter />
      {/* <DateTab day={day} month={month} year={year} Day={dayOfWeekName} /> */}
      <Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            marginTop: "2px",
            marginBottom: "2px",
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <AddIcon onClick={handleSubmit} />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="add new task"
            inputProps={{ "aria-label": "search google maps" }}
            value={input}
            onChange={handleChange}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <InsertPhotoIcon onClick={handleAddPhoto} />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <AddLinkIcon onClick={handleAddLink} />
          </IconButton>
        </Paper>
        {openLink && <AttachLink />}
        {openPhotoLink && <AttachPhotoLink />}
      </Box>
      <Box>
        {tasks.length === 0 ? (
          <Typography>No tasks added yet</Typography>
        ) : (
          tasks.map(
            ({ task, day, month, year, taskId, _id, link, picturePath }) => {
              return (
                <NewTask
                  key={_id}
                  task={task}
                  link={link}
                  picturePath={picturePath}
                  day={day}
                  month={month}
                  year={year}
                  taskId={taskId}
                />
              );
            }
          )
        )}
      </Box>
    </Box>
  );
};

export default Todos;

// const handleSubmit = async () => {
//   arr.push(input);
//   setInput("");
//   const SendingData = {
//     listId: `${day}-${month}-${year}`,
//     task: input,
//   };
//   console.log(SendingData);
//   dispatch(taskManager(SendingData));

//   // const submitTask = await fetch("http://localhost:3001", {
//   //   method: "POST",
//   //   headers: { "Content-Type": "application/json" },
//   //   body: JSON.stringify(SendingData),
//   // });
//   // const savedTask = await submitTask.json();
//   // dispatch(setTask(savedTask));
//   // setTask(input);
// };
