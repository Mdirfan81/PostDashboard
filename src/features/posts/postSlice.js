import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axios from "axios";
import { apiUrl } from "../../constant/constant";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const fetchEditPost = createAsyncThunk(
  "posts/fetchEditPost",
  async (payload) => {
    try {
      const { id } = JSON.parse(payload);
      console.log("Calling API fetch Edit Post", payload, id);

      const response = await axios.put(`${apiUrl}/posts/${id}`);
      console.log("APi response", response.status);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
);
export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (payload) => {
    try {
      console.log("In the delete fetch", payload);
      const response = await axios.delete(`${apiUrl}/posts/${payload}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);
export const fetchCreatePost = createAsyncThunk(
  "posts/fetchCreatePost",
  async (payload) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, payload);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  allPosts: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    createPost: (state, action) => {
      if (action.payload) {
        action.payload["id"] = state.allPosts.length + 1;
        // console.log("In the creation of the Post", action.payload);
        state.allPosts.unshift(action.payload);
      }
    },
    editPost: (state, action) => {
      console.log("here");
      let found = state.allPosts.some((data) => action.payload.id === data.id);

      if (found) {
        state.allPosts = state.allPosts.filter(
          (data) => data.id !== action.payload.id
        );
        state.allPosts.unshift(action.payload);
      }
    },
    deletePost: (state, action) => {
      let found = state.allPosts.some((data) => action.payload === data.id);
      if (found) {
        state.allPosts = state.allPosts.filter(
          (data) => data.id !== action.payload
        );
      }
    },
  },
  extraReducers: {
    [fetchAllPosts.fulfilled]: (state, { payload }) => {
      console.log("Fetch all Posts Successfully");
      return { allPosts: payload };
    },
    [fetchCreatePost.fulfilled]: (state, { payload }) => {
      console.log(" Users Created successfully");
      return { payload };
    },
    [fetchEditPost.fulfilled]: (state, { payload }) => {
      console.log("Users Edit successfully", payload);
      return { payload };
    },
    [fetchDeletePost.fulfilled]: (state, { payload }) => {
      console.log("Users Deleted successfully");
      return { payload };
    },
  },
});

export const { createPost, editPost, deletePost } = postSlice.actions;

export const getAllPosts = (state) => state.posts.allPosts;

export default postSlice.reducer;
