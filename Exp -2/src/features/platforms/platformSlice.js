import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [
    "Instagram",
    "Facebook",
    "LinkedIn",
    "X / Twitter",
    "YouTube",
    "Threads",
  ],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,

  reducers: {
    addPlatform: (state, action) => {
      const newPlatform = action.payload.trim();

      if (
        newPlatform &&
        !state.platforms.some(
          (platform) =>
            platform.toLowerCase() === newPlatform.toLowerCase()
        )
      ) {
        state.platforms.push(newPlatform);
      }
    },
  },
});

export const { addPlatform } = platformSlice.actions;

export default platformSlice.reducer;