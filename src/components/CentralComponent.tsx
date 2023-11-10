import React, { useState } from "react";
import "./CentralComponent.css";
import ProjectTasks from "./ProjectTasks";
import { ProjectTasksProps } from "../store/slices/projectTasksSlice";

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
        .filter((project) => project.isVisibile)
        .map((project) => (
          <ProjectTasks key={project.id} projectData={project} />
        ))}
    </div>
  );
};

export default CentralComponent;
