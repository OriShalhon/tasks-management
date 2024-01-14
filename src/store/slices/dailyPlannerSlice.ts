import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadDailyPlannerReducers } from "./dailyPlanner.thunks";

export enum timeOfDay {
  morning = 0,
  afternoon,
  evening,
}

export enum dailyTaskStatus {
  new = 0,
  done,
}

export type DailyTaskProps = {
  id: number;
  headline: string;
  isDone: boolean;
  timeOfDay: timeOfDay;
};

export interface DailyPlannerState {
  morningTasks: DailyTaskProps[];
  afternoonTasks: DailyTaskProps[];
  eveningTasks: DailyTaskProps[];
}

const initialState: DailyPlannerState = {
  morningTasks: [],
  afternoonTasks: [],
  eveningTasks: [],
};

const dailyPlannerSlice = createSlice({
  name: "dailyPlanner",
  initialState,
  reducers: {
    addTaskByTime: (
      state,
      action: PayloadAction<{ Task: DailyTaskProps; time: timeOfDay }>
    ) => {
      switch (action.payload.time) {
        case timeOfDay.morning:
          state.morningTasks.push(action.payload.Task);
          break;
        case timeOfDay.afternoon:
          state.afternoonTasks.push(action.payload.Task);
          break;
        case timeOfDay.evening:
          state.eveningTasks.push(action.payload.Task);
          break;
        default:
          break;
      }
    },
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const tasks = [
        ...state.morningTasks,
        ...state.afternoonTasks,
        ...state.eveningTasks,
      ];
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
      }
    },
  },
  extraReducers(builer) {
    loadDailyPlannerReducers(builer);
  },
});

export const { addTaskByTime, toggleTaskStatus } = dailyPlannerSlice.actions;
export default dailyPlannerSlice.reducer;
