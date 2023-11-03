import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import CentralComponent from "./components/CentralComponent";
import Header from "./components/Header";

import Task, { TaskProps } from "./components/Task";
import { ProjectTasksProps } from "./components/ProjectTasks";
  
const App:React.FC = () => {
  //place holders for later actual data
  const taskData1: TaskProps = {
    id: 1,
    text: "Task 1",
    leadingTasks: [],
    isCompleted: true,
    project: 1,
    description: "This is a description",
  };

  const taskData2: TaskProps = {
    id: 2,
    text: "Task 2",
    leadingTasks: [],
    isCompleted: true,
    project: 1,
    description: "This is a description",
  };

  const taskData3: TaskProps = {
    id: 1,
    text: "Task 3",
    leadingTasks: [],
    isCompleted: true,
    project: 2,
    description: "This is a description",
  };

  const taskData4 = {
    id: 2,
    text: "Task 4",
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

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectTasksProps[]>(projectTasks);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const toggleProjectVisibility = (projectId: number) => {
    setProjects(
      projects.map((project) => {
        project.id === projectId
          ? (project.isVisibile = !project.isVisibile)
          : (project.isVisibile = project.isVisibile);
        return project;
      })
    );
  }

  const addTaskToProject = (task: TaskProps, projectId: number) => {
    setProjects(
      projects.map((project) => {
        project.id === projectId
          ? (project.tasks = [...project.tasks, task])
          : (project.tasks = project.tasks);
        return project;
      })
    );
  }

  const toggleTaskIsComplete = (projectId: number, taskId: number) => {
    setProjects(
      projects.map((project) => {
        project.id === projectId
          ? (project.tasks = project.tasks.map((task) => {
              task.id === taskId
                ? (task.isCompleted = !task.isCompleted)
                : (task.isCompleted = task.isCompleted);
              return task;
            }))
          : (project.tasks = project.tasks);
        return project;
      })
    );
  }

  const deleteTask = (projectId: number, taskId: number) => {
    setProjects(
      projects.map((project) => {
        project.id === projectId
          ? (project.tasks = project.tasks.filter((task) => task.id !== taskId))
          : (project.tasks = project.tasks);
        return project;
      })
    );
  }

  const onToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const addProject = (newProject: string) => {
    let projectTask: ProjectTasksProps = {
      id: projects.length + 1,
      tasks: [],
      projectName: newProject,
      isVisibile: true,
    };
    setProjects([...projects, projectTask]);
  }

  return (
    <div className="App">
      <Header onToggleSideBar={onToggleSidebar} />
      <SideBar
        isDarkMode={darkMode}
        onChangeDarkMode={() => toggleDarkMode()}
        projects={projects}
        onAddProject={(project: string) => addProject(project)}
        isSidebarVisible={isSidebarVisible}
        onChangeProjectVisibility={(projectId: number) =>
          toggleProjectVisibility(projectId)
        }
      />
      <CentralComponent
        projects={projects}
        onAddTask={(task: TaskProps, projectId: number) =>
          addTaskToProject(task, projectId)
        }
        onChangeTaskStatus={(projectId: number, taskId: number) =>
          toggleTaskIsComplete(projectId, taskId)
        }
        onDeleteTask={(projectId: number, taskId: number) =>
          deleteTask(projectId, taskId)
        }
      />
    </div>
  );
}

export default App;
