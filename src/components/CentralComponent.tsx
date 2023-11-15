import React from "react";
import { ProjectTasksProps } from "../store/slices/projectTasksSlice";
import "./CentralComponent.css";
import ProjectTasks from "./ProjectTasks";

interface Props {
  projects: ProjectTasksProps[];
  isSideBarVisible: boolean;
}

const CentralComponent: React.FC<Props> = ({ projects, isSideBarVisible }) => {
  return (
    <div
      className={
        isSideBarVisible ? "centralComponent" : "centralComponent large"
      }
    >
      {projects
        .filter((project) => project.isVisible)
        .map((project) => (
          <ProjectTasks key={project.id} projectData={project} />
        ))}
    </div>
  );
};

export default CentralComponent;
