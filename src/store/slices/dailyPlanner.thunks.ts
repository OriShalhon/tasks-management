// import axios from "axios"; - to consider for later implementation
import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import projectDummies from "../../utils/projectsTasksInfo.json";
import { DailyPlannerState } from "./dailyPlannerSlice";

export const loadDailyPlanner = createAsyncThunk(
  "dailyPlanner/loadDailyPlanner",
  async () => {
    const dailyPlannerData: DailyPlannerState = {
      morningTasks: projectDummies.dailyPlanner.morningTasks,
      afternoonTasks: projectDummies.dailyPlanner.afternoonTasks,
      eveningTasks: projectDummies.dailyPlanner.eveningTasks,
    };
    return dailyPlannerData;
  }
);

export const loadDailyPlannerReducers = (
  builder: ActionReducerMapBuilder<DailyPlannerState>
) => {
  builder.addCase(loadDailyPlanner.pending, () => {
    // called loadProjectTasks - this is performed when the action is dispatched and not done yet
    console.log("started reading dailyPlanner data");
  });
  builder.addCase(loadDailyPlanner.rejected, () => {
    // this is performed when the action is dispatched and failed
    console.log("failed to read dailyPlanner data");
  });
  builder.addCase(loadDailyPlanner.fulfilled, (state, action) => {
    state.morningTasks = action.payload.morningTasks;
    state.afternoonTasks = action.payload.afternoonTasks;
    state.eveningTasks = action.payload.eveningTasks;
  });
};
