// import axios from "axios"; - to consider for later implementation
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectTasksProps, ProjectTasksState } from "./projectTasksSlice";
import projectDummies from "../../utils/projectsTasksInfo.json";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

export const loadProjectTasks = createAsyncThunk(
  "projectTasks/loadProjectTasks",
  async () => {
    const projectData: ProjectTasksProps[] = projectDummies.projects.map(
      (project) => ({
        id: project.id,
        projectName: project.projectName,
        isVisible: project.isVisible,
        tasks: project.tasks,
      })
    );
    return projectData;
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
    state.projects = action.payload;
  });
};
