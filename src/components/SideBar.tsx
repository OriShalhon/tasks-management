import React, { useState } from "react";
import "./SideBar.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ProjectTasksProps } from "../store/slices/projectTasksSlice";
import { useAppDispatch } from "../store/store";
import {
  toggleProjectVisibility,
  addProject,
} from "../store/slices/projectTasksSlice";
import { toggleDarkMode } from "../store/slices/appSlice";

interface Props {
  isDarkMode: boolean;
  projects: ProjectTasksProps[];
  isSidebarVisible: boolean;
}

const Sidebar: React.FC<Props> = ({
  isDarkMode,
  projects,
  isSidebarVisible,
}) => {
  const dispatch = useAppDispatch();
  const [newProject, setNewProject] = useState<string>("");

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
