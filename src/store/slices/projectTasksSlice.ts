import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskProps = {
  id: number;
  headline: string;
  leadingTasks: number[];
  isCompleted: boolean;
  project: number;
  description: string;
}

export type ProjectTasksProps = {
  id: number;
  tasks: TaskProps[];
  projectName: string;
  isVisibile: boolean;
}

//place holders for later actual data
const taskData1: TaskProps = {
  id: 1,
  headline: "Task 1",
  leadingTasks: [],
  isCompleted: true,
  project: 1,
  description: "This is a description",
};

const taskData2: TaskProps = {
  id: 2,
  headline: "Task 2",
  leadingTasks: [],
  isCompleted: true,
  project: 1,
  description: "This is a description",
};

const taskData3: TaskProps = {
  id: 1,
  headline: "Task 3",
  leadingTasks: [],
  isCompleted: true,
  project: 2,
  description: "This is a description",
};

const taskData4 = {
  id: 2,
  headline: "Task 4",
  leadingTasks: [],
  isCompleted: false,
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
    toggleTaskComplete(state, action) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.tasks = project.tasks.map((task) => {
            if (task.id === action.payload.taskId) {
              task.isCompleted = !task.isCompleted;
            }
            return task;
          });
        }
        return project;
      });
    },
    toggleProjectVisibility(state, action) {
      state.projects = state.projects.map((project) => {
        project.id === action.payload
          ? (project.isVisibile = !project.isVisibile)
          : (project.isVisibile = project.isVisibile);
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
} = projectTasksSlice.actions;

export default projectTasksSlice.reducer;
