import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const taskManager = createAsyncThunk(
  "allTask/taskManager",
  async (SendingData) => {
    const { act } = SendingData;
    console.log(SendingData);
    console.log(act);
    const submitTask = await fetch(
      act === "addTodo"
        ? `http://localhost:3001`
        : `http://localhost:3001/dateRange`,
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
      console.log(actions);
      state.photo = actions.payload;
    },
    setCountTasks: (state, actions) => {
      console.log(actions);
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
