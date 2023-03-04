import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./index";

export default configureStore({
  reducer: {
    reducer: Reducer,
  },
});
