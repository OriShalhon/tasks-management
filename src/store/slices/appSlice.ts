import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isDarkMode: boolean;
  showFinishedTasks: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
  showFinishedTasks: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleShowFinishedTasks(state) {
      state.showFinishedTasks = !state.showFinishedTasks;
    },
  },
});

export const { toggleDarkMode, toggleShowFinishedTasks } = appSlice.actions;
export default appSlice.reducer;
