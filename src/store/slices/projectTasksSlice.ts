import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadProjectTasksReducers } from "./projectTasks.thunks";

const MAX_HISTORY_LENGTH = 10;

export enum TaskStatus {
  new = 0,
  inProgress,
  done,
}

export type TaskProps = {
  id: number;
  headline: string;
  leadingTasks: number[];
  status: TaskStatus;
  projectId: number;
  description: string;
  startTime?: Date;
};

export type ProjectTasksProps = {
  id: number;
  projectName: string;
  isVisible: boolean;
  tasks: TaskProps[];
};

export interface ProjectTasksState {
  projects: ProjectTasksProps[];
  history: ProjectTasksProps[][]; // history of projects for undo/redo
}

const initialState: ProjectTasksState = {
  projects: [],
  history: [],
};

const projectTasksSlice = createSlice({
  name: "projectTasks",
  initialState,
  reducers: {
    addProject(state, action: PayloadAction<string>) {
      let newProject: ProjectTasksProps = {
        id: state.projects.length + 1,
        tasks: [],
        projectName: action.payload,
        isVisible: true,
      };
      state.projects.push(newProject);
    },
    removeProject(state, action: PayloadAction<{ projectId: number }>) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.projectId
      );
    },
    addTaskToProject(
      state,
      action: PayloadAction<{ projectId: number; task: TaskProps }>
    ) {
      const { projectId, task } = action.payload;
      const newTask: TaskProps = {
        ...task,
        projectId,
      };
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks.push(newTask);
        }
        return project;
      });
    },
    deleteTaskFromProject(
      state,
      action: PayloadAction<{ projectId: number; taskId: number }>
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.filter(
            (task) => task.id !== action.payload.taskId
          );
        }
        return project;
      });
    },
    toggleTaskComplete(
      state,
      action: PayloadAction<{ projectId: number; taskId: number }>
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              task.status = (task.status + 1) % 3; // cycle between statuses
              if (task.status === TaskStatus.inProgress) {
                task.startTime = new Date();
              }
            }
            return task;
          });
        }
        return project;
      });
    },
    toggleProjectVisibility(state, action: PayloadAction<number>) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload) {
          project.isVisible = !project.isVisible;
        }
        return project;
      });
    },
    editTaskDescription(
      state,
      action: PayloadAction<{
        projectId: number;
        taskId: number;
        description: string;
      }>
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              task.description = action.payload.description;
            }
            return task;
          });
        }
        return project;
      });
    },
    changeProjectName(
      state,
      action: PayloadAction<{
        projectId: number;
        newProjectName: string;
      }>
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.projectName = action.payload.newProjectName;
        }
        return project;
      });
    },
    saveStateToHistory(state) {
      if (state.history.length === MAX_HISTORY_LENGTH) {
        state.history.shift();
      }
      const projectsCopy = state.projects.map((project) => {
        return {
          ...project,
          tasks: project.tasks.map((task) => ({ ...task })),
        };
      });
      state.history.push(projectsCopy);
    },
    undo(state) {
      if (state.history.length > 1) {
        state.projects = state.history.pop()!;
      }
    },
  },
  extraReducers(builer) {
    loadProjectTasksReducers(builer);
  },
});

export const {
  addProject,
  removeProject,
  addTaskToProject,
  deleteTaskFromProject,
  toggleTaskComplete,
  toggleProjectVisibility,
  editTaskDescription,
  changeProjectName,
  undo,
} = projectTasksSlice.actions;

export default projectTasksSlice.reducer;
