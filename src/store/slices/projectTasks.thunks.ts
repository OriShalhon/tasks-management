// import axios from "axios"; - to consider for later implementation
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import projectDummies from "../../utils/projectsTasksInfo.json";
import { BoardProps } from "./boardsSlice";
import { ProjectTasksState } from "./projectTasksSlice";

export const loadProjectTasks = createAsyncThunk(
  "projectTasks/loadProjectTasks",

  async (boardID: number) => {
    const BoardData: BoardProps | undefined = projectDummies.boards.find(
      (board) => board.id === boardID
    );
    if (!BoardData) {
      console.log("Board not found");
    }
    return BoardData?.projects;
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
    action.payload ? (state.projects = action.payload) : (state.projects = []);
  });
};
