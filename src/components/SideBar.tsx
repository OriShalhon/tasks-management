import React, { useState } from "react";
import "./SideBar.css";
import { IconContext } from "react-icons";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ProjectTasksProps } from "./ProjectTasks";
import * as FaIcons from "react-icons/fa";

interface Props {
  isDarkMode: boolean;
  onChangeDarkMode: () => void;
  projects: ProjectTasksProps[];
  onAddProject: (newProject: string) => void;
  isSidebarVisible: boolean;
  onChangeProjectVisibility: (projectId: number) => void;
}
const Sidebar: React.FC<Props> = ({
  isDarkMode,
  onChangeDarkMode,
  projects,
  onAddProject,
  isSidebarVisible,
  onChangeProjectVisibility,
}) => {
  const [newProject, setNewProject] = useState<string>("");

  const addProject = () => {
    if (newProject) {
      onAddProject(newProject);
      setNewProject("");
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#696969" }}>
        <div
          className={
            isSidebarVisible ? "sidebar-content visible" : "sidebar-content"
          }
        >
          <div className="sidebar-item">
            <input
              type="text"
              placeholder="Enter project name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <button className="button" onClick={addProject}>
              <FaIcons.FaPlus />
            </button>
          </div>
          <ul>
            {projects.map((project) => (
              <li
                className={
                  project.isVisibile ? "sidebar-item selected" : "sidebar-item"
                }
                key={project.id}
                onClick={() => onChangeProjectVisibility(project.id)}
              >
                {project.projectName}
              </li>
            ))}
          </ul>
          <DarkModeSwitch
            onChange={onChangeDarkMode}
            checked={isDarkMode}
            size={20}
          />
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
