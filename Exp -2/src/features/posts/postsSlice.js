import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      content: "Welcome to my first social media post!",
      platform: "Instagram",
    },
    {
      id: 2,
      content: "Learning Redux Toolkit is interesting.",
      platform: "LinkedIn",
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;