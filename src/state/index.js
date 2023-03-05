import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../url";

export const taskManager = createAsyncThunk(
  "allTask/taskManager",
  async (SendingData) => {
    const { act } = SendingData;
    console.log(SendingData);
    console.log(act);
    const submitTask = await fetch(
      act === "addTodo" ? `${url}` : `${url}/dateRange/range`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SendingData),
      }
    );
    const savedTask = await submitTask.json();
    return savedTask;
  }
);

const initialState = {
  mode: "light",
  drawer: false,
  tasks: [],
  link: "",
  photo: "",
  arr: [],
};
export const stateManagement = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = "light" ? "dark" : "light";
    },
    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },
    setList: (state, actions) => {
      state.tasks = actions.payload;
    },
    setLink: (state, actions) => {
      state.link = actions.payload;
    },
    setPhotoLink: (state, actions) => {
      state.photo = actions.payload;
    },
    setCountTasks: (state, actions) => {
      state.arr = actions.payload;
    },
  },
  extraReducers: {
    [taskManager.pending]: () => {
      console.log("loading");
    },
    [taskManager.fulfilled]: (state, action) => {
      state.link = "";
      state.photo = "";
      state.tasks = action.payload;
    },
    [taskManager.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const {
  setMode,
  setDrawer,
  setList,
  setLink,
  setPhotoLink,
  setCountTasks,
} = stateManagement.actions;

export default stateManagement.reducer;
