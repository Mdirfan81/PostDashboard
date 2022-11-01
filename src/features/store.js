import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postReducer from "./posts/postSlice";

export default configureStore({
  reducer: {
    posts: postReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
