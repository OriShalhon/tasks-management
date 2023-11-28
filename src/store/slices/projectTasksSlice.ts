import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadProjectTasksReducers } from "./projectTasks.thunks";

const MAX_HISTORY_LENGTH = 10;

export enum TaskStatus {
  new = 0,
  inProgress,
  done,
}

export type BoardProps = {
  id: number;
  name: string;
  projects: ProjectTasksProps[];
}

export type TaskProps = {
  id: number;
  headline: string;
  leadingTasks: number[];
  status: TaskStatus;
  projectId: number;
  description: string;
  startTime?: Date;
  isExpanded?: boolean;
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
    cycleTaskStatus(
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
    changeTaskDependencies(
      state,
      action: PayloadAction<{
        projectId: number;
        taskId: number;
        leadingTasks: number[];
      }>
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              task.leadingTasks = action.payload.leadingTasks;
            }
            return task;
          });
        }
        return project;
      });
    },
    toggleTaskExpanded(
      state,
      action: PayloadAction<{
        projectId: number;
        taskId: number;
      }>
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              task.isExpanded = !task.isExpanded;
            }
            return task;
          });
        }
        return project;
      });
    },
    reorderTasksInProject(
      state,
      action: PayloadAction<{
        projectId: number;
        sourceIndex: number;
        destinationIndex: number;
      }>
    ) {
      const { projectId, sourceIndex, destinationIndex } = action.payload;
      state.projects = state.projects.map((project) => {
        if (project.id === projectId) {
          const [removedTask] = project.tasks.splice(sourceIndex, 1);
          project.tasks.splice(destinationIndex, 0, removedTask);
        }
        return project;
      });
    },
    moveTaskToBetweenProjects(
      state,
      action: PayloadAction<{
        sourceProjectId: number;
        destinationProjectId: number;
        taskId: number;
        destinationIndex: number;
      }>
    ) {
      const {
        sourceProjectId,
        destinationProjectId,
        taskId,
        destinationIndex,
      } = action.payload;
      const sourceProject = state.projects.find(
        (project) => project.id === sourceProjectId
      );
      const destinationProject = state.projects.find(
        (project) => project.id === destinationProjectId
      );

      if (sourceProject && destinationProject) {
        const [removedTask] = sourceProject.tasks.splice(
          sourceProject.tasks.findIndex((task) => task.id === taskId),
          1
        );
        destinationProject.tasks.splice(destinationIndex, 0, removedTask);
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
  cycleTaskStatus,
  toggleProjectVisibility,
  editTaskDescription,
  changeProjectName,
  undo,
  moveTaskToBetweenProjects,
  reorderTasksInProject,
  toggleTaskExpanded,
} = projectTasksSlice.actions;

export default projectTasksSlice.reducer;
