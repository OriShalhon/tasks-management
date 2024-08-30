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
  status: TaskStatus;
  projectId: number;
  description: string;
  startTime?: Date;
  isExpanded?: boolean;
  leadingTasks?: number;
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

const withSaveToHistory = <T>(
  reducer: (state: ProjectTasksState, action: PayloadAction<T>) => void
) => ({
  reducer,
  prepare: (payload: T) => ({
    payload,
    meta: { saveToHistory: true },
  }),
});

const projectTasksSlice = createSlice({
  name: "projectTasks",
  initialState,
  reducers: {
    addProject: withSaveToHistory<string>((state, action) => {
      let newProject: ProjectTasksProps = {
        id: state.projects.length + 1,
        tasks: [],
        projectName: action.payload,
        isVisible: true,
      };
      state.projects.push(newProject);
    }),
    removeProject: withSaveToHistory<{ projectId: number }>((state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.projectId
      );
    }),
    addTaskToProject: withSaveToHistory<{ projectId: number; task: TaskProps }>(
      (state, action) => {
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
      }
    ),
    deleteTaskFromProject: withSaveToHistory<{
      projectId: number;
      taskId: number;
    }>((state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.filter(
            (task) => task.id !== action.payload.taskId
          );
        }
        return project;
      });
    }),

    cycleTaskStatus: withSaveToHistory<{ projectId: number; taskId: number }>(
      (state, action) => {
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
      }
    ),
    toggleProjectVisibility: withSaveToHistory<number>((state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload) {
          project.isVisible = !project.isVisible;
        }
        return project;
      });
    }),
    editTaskDescription: withSaveToHistory<{
      projectId: number;
      taskId: number;
      description: string;
    }>((state, action) => {
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
    }),
    changeProjectName: withSaveToHistory<{
      projectId: number;
      newProjectName: string;
    }>((state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.projectName = action.payload.newProjectName;
        }
        return project;
      });
    }),
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
      if (state.history.length > 0) {
        state.projects = state.history.pop()!;
      }
    },
    changeTaskDependencies: withSaveToHistory<{
      projectId: number;
      taskId: number;
      leadingTaskID: number;
    }>((state, action) => {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              task.leadingTasks = action.payload.leadingTaskID;
            }
            return task;
          });
        }
        return project;
      });
    }),
    toggleTaskExpanded: withSaveToHistory<{
      projectId: number;
      taskId: number;
    }>((state, action) => {
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
    }),
    reorderTasksInProject: withSaveToHistory<{
      projectId: number;
      sourceIndex: number;
      destinationIndex: number;
    }>((state, action) => {
      const { projectId, sourceIndex, destinationIndex } = action.payload;
      state.projects = state.projects.map((project) => {
        if (project.id === projectId) {
          const [removedTask] = project.tasks.splice(sourceIndex, 1);
          project.tasks.splice(destinationIndex, 0, removedTask);
        }
        return project;
      });
    }),
    moveTaskToBetweenProjects: withSaveToHistory<{
      sourceProjectId: number;
      destinationProjectId: number;
      taskId: number;
      destinationIndex: number;
    }>((state, action) => {
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
    }),
    reorderProjects: withSaveToHistory<{
      sourceIndex: number;
      destinationIndex: number;
    }>((state, action) => {
      //TODO: fix changing order in case some projects are hidden
      const { sourceIndex, destinationIndex } = action.payload;
      const [removedProject] = state.projects.splice(sourceIndex, 1);
      state.projects.splice(destinationIndex, 0, removedProject);
    }),
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
  changeTaskDependencies,
  reorderProjects,
} = projectTasksSlice.actions;

export default projectTasksSlice.reducer;
