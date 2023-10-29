import React, { useState } from "react";
import "./CentralComponent.css";
import ProjectTasks from "./ProjectTasks";
import { ProjectTasksProps } from "./ProjectTasks";

const CentralComponent: React.FC<{ projects: ProjectTasksProps[] }> = ({
  projects,
}) => {
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
