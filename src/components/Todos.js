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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { setCountTasks, setList, taskManager } from "../state";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddLinkIcon from "@mui/icons-material/AddLink";
import NewTask from "./widgets/NewTask";
import Filter from "./widgets/Date/Filter";
import AttachLink from "./widgets/AttachLink";
import AttachPhotoLink from "./widgets/AttachPhotoLink";
import { url } from "../url";

const Todos = () => {
  let today = new Date();
  const taskId = today;
  let year = today.getFullYear();
  let month = today.getMonth() + 1; // Add 1 because getMonth() returns a zero-based index
  let day = today.getDate();

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [openLink, setOpenLink] = useState(false);
  const [openPhotoLink, setOpenPhotoLink] = useState(false);
  const { drawer, tasks, link, photo, arr } = useSelector(
    (state) => state.reducer
  );
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    countTask();
  }, [arr]);

  const countTask = async () => {
    const response = await fetch(`${url}/countTask`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setCountTasks(data));
  };

  const fetchData = async () => {
    const response = await fetch(`${url}`, {
      method: "GET",
    });
    const data = await response.json();
    dispatch(setList(data));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setList(items));
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
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
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
          <Chart value={arr} />
        </Box>
        <Filter />
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
            <Droppable droppableId="tasks">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map(
                    (
                      {
                        task,
                        day,
                        month,
                        year,
                        taskId,
                        _id,
                        link,
                        picturePath,
                      },
                      index
                    ) => (
                      <Draggable key={_id} draggableId={_id} index={index}>
                        {(provided) => (
                          <Box
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <NewTask
                              task={task}
                              link={link}
                              picturePath={picturePath}
                              day={day}
                              month={month}
                              year={year}
                              taskId={taskId}
                            />
                          </Box>
                        )}
                      </Draggable>
                    )
                  )}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          )}
        </Box>
      </Box>
    </DragDropContext>
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
