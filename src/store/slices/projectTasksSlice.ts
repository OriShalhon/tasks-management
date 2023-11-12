import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  project: number;
  description: string;
  startTime?: Date;
};

export type ProjectTasksProps = {
  id: number;
  tasks: TaskProps[];
  projectName: string;
  isVisibile: boolean;
};

//place holders for later actual data
const taskData1: TaskProps = {
  id: 1,
  headline: "Task 1",
  leadingTasks: [],
  status: TaskStatus.new,
  project: 1,
  description: "This is a description",
};

const taskData2: TaskProps = {
  id: 2,
  headline: "Task 2",
  leadingTasks: [],
  status: TaskStatus.new,
  project: 1,
  description: "This is a description",
};

const taskData3: TaskProps = {
  id: 1,
  headline: "Task 3",
  leadingTasks: [],
  status: TaskStatus.new,
  project: 2,
  description: "This is a description",
};

const taskData4 = {
  id: 2,
  headline: "Task 4",
  leadingTasks: [],
  status: TaskStatus.new,
  project: 2,
  description: "This is a description",
};

const projectTasks1: ProjectTasksProps = {
  id: 1,
  tasks: [taskData1, taskData2],
  projectName: "ProjectA",
  isVisibile: true,
};

const projectTasks2: ProjectTasksProps = {
  id: 2,
  tasks: [taskData3, taskData4],
  projectName: "ProjectB",
  isVisibile: false,
};

const projectTasks3: ProjectTasksProps = {
  id: 3,
  tasks: [],
  projectName: "ProjectC",
  isVisibile: true,
};

const projectTasks: ProjectTasksProps[] = [
  projectTasks1,
  projectTasks2,
  projectTasks3,
];

interface ProjectTasksState {
  projects: ProjectTasksProps[];
}

const initialState: ProjectTasksState = {
  projects: projectTasks,
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
        isVisibile: true,
      };
      state.projects.push(newProject);
    },
    removeProject(state, action: PayloadAction<number>) {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    addTaskToProject(
      state,
      action: PayloadAction<{ projectId: number; task: TaskProps }>
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks.push(action.payload.task);
        }
        return project;
      });
    },
    deleteTask(
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
              task.status === TaskStatus.inProgress
                ? (task.startTime = new Date())
                : (task.startTime = task.startTime);
            }
            return task;
          });
        }
        return project;
      });
    },
    toggleProjectVisibility(state, action: PayloadAction<number>) {
      state.projects = state.projects.map((project) => {
        project.id === action.payload
          ? (project.isVisibile = !project.isVisibile)
          : (project.isVisibile = project.isVisibile);
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
  },
});

export const {
  addProject,
  removeProject,
  addTaskToProject,
  deleteTask,
  toggleTaskComplete,
  toggleProjectVisibility,
  editTaskDescription,
  changeProjectName,
} = projectTasksSlice.actions;

export default projectTasksSlice.reducer;
