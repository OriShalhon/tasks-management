import React, { useState } from "react";
import "./CentralComponent.css";
import ProjectTasks from "./ProjectTasks";
import { ProjectTasksProps } from "../store/slices/projectTasksSlice";

interface Props {
  projects: ProjectTasksProps[];
}

const CentralComponent: React.FC<Props> = ({ projects }) => {
  console.log(projects);
  return (
    <div className="centralComponent">
      {projects
        .filter((project) => project.isVisibile)
        .map((project) => (
          <ProjectTasks key={project.id} projectData={project} />
        ))}
    </div>
  );
};

export default CentralComponent;
