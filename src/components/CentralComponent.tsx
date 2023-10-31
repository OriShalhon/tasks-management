import React, { useState } from "react";
import "./CentralComponent.css";
import ProjectTasks from "./ProjectTasks";
import { ProjectTasksProps } from "./ProjectTasks";
import { TaskProps } from "./Task";

interface Props {
  projects: ProjectTasksProps[];
  onAddTask: (newTask: TaskProps, projectId: number) => void;
}

const CentralComponent: React.FC<Props> = ({ projects, onAddTask }) => {
  return (
    <div className="centralComponent">
      {projects
        .filter((project) => project.isVisibile)
        .map((project) => (
          <ProjectTasks
            key={project.id}
            projectData={project}
            onAddTask={onAddTask}
          />
        ))}
    </div>
  );
};

export default CentralComponent;
