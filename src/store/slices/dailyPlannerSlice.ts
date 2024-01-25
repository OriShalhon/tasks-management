import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadDailyPlannerReducers } from "./dailyPlanner.thunks";
import { TaskProps } from "./projectTasksSlice";

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
  parentId: number;
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
      action: PayloadAction<{ Task: TaskProps; time: timeOfDay }>
    ) => {
      const newTask = {
        id: action.payload.Task.id, //TODO - add uniqueId behavior
        headline: action.payload.Task.headline,
        isDone: false,
        timeOfDay: action.payload.time,
        parentId: action.payload.Task.id,
      };
      switch (action.payload.time) {
        case timeOfDay.morning:
          state.morningTasks.push(newTask);
          break;
        case timeOfDay.afternoon:
          state.afternoonTasks.push(newTask);
          break;
        case timeOfDay.evening:
          state.eveningTasks.push(newTask);
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
