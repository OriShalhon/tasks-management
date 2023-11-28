// import axios from "axios"; - to consider for later implementation
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import projectDummies from "../../utils/projectsTasksInfo.json";
import { BoardProps, ProjectTasksState } from "./projectTasksSlice";

export const loadProjectTasks = createAsyncThunk(
  "projectTasks/loadProjectTasks",

  async () => {
    const Boards: BoardProps[] = projectDummies.boards.map((board) => ({
      id: board.id,
      name: board.boardName,
      projects: board.projects,
    }));

    return Boards;
  }
);

export const loadProjectTasksReducers = (
  builder: ActionReducerMapBuilder<ProjectTasksState>
) => {
  builder.addCase(loadProjectTasks.pending, () => {
    // called loadProjectTasks - this is performed when the action is dispatched and not done yet
    console.log("started reading json file");
  });
  builder.addCase(loadProjectTasks.rejected, () => {
    // this is performed when the action is dispatched and failed
    console.log("failed to read json file");
  });
  builder.addCase(loadProjectTasks.fulfilled, (state, action) => {
    const firstBoard = action.payload[0];
    state.projects = firstBoard.projects; 
  });
};
