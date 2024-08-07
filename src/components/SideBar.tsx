import React, { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  toggleDarkMode,
  toggleShowFinishedTasks,
} from "../store/slices/appSlice";

import {
  ProjectTasksProps,
  addProject,
  toggleProjectVisibility,
} from "../store/slices/projectTasksSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import "./SideBar.css";

interface Props {
  isDarkMode: boolean;
  projects: ProjectTasksProps[];
  isSidebarVisible: boolean;
  activeBoardName: string;
}

const Sidebar: React.FC<Props> = ({
  isDarkMode,
  projects,
  isSidebarVisible,
  activeBoardName,
}) => {
  const dispatch = useAppDispatch();
  const [newProject, setNewProject] = useState<string>("");

  const showFinishedTasks = useAppSelector(
    (state) => state.app.showFinishedTasks
  );

  const onToggleShowFinishedTasks = () => {
    dispatch(toggleShowFinishedTasks());
  };
  const onAddProject = () => {
    if (newProject) {
      dispatch(addProject(newProject));
      setNewProject("");
    }
  };

  return (
    <>
      <div
        className={
          isSidebarVisible ? "sidebar-content visible" : "sidebar-content"
        }
      >
        <div className="sidebar-item">
          <h2>{activeBoardName}</h2>
          <input
            className="input"
            type="text"
            placeholder="Enter project name"
            value={newProject}
            onChange={(e) => setNewProject(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAddProject();
              }
            }}
          />
        </div>
        <ul>
          {projects.map((project) => (
            <li
              className={
                project.isVisible ? "sidebar-item selected" : "sidebar-item"
              }
              key={project.id}
              onClick={() => dispatch(toggleProjectVisibility(project.id))}
            >
              {project.projectName}
            </li>
          ))}
        </ul>

        <div className="sidebar-item">
          <label htmlFor="showFinishedTasks">Show Finished Tasks</label>
          <input
            type="checkbox"
            id="showFinishedTasks"
            checked={showFinishedTasks}
            onChange={onToggleShowFinishedTasks}
          />
        </div>
        <DarkModeSwitch
          className="dark-mode-switch"
          onChange={() => dispatch(toggleDarkMode())}
          checked={isDarkMode}
          size={24}
        />
      </div>
    </>
  );
};

export default Sidebar;
