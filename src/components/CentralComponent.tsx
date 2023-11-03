import React, { useState } from "react";
import "./CentralComponent.css";
import ProjectTasks from "./ProjectTasks";
import { ProjectTasksProps } from "./ProjectTasks";
import { TaskProps } from "./Task";

interface Props {
  projects: ProjectTasksProps[];
  onAddTask: (newTask: TaskProps, projectId: number) => void;
  onChangeTaskStatus: (projectId: number, taskId: number) => void;
  onDeleteTask: (projectId: number, taskId: number) => void;
}

const CentralComponent: React.FC<Props> = ({ projects, onAddTask, onChangeTaskStatus, onDeleteTask}) => {
  return (
    <div className="centralComponent">
      {projects
        .filter((project) => project.isVisibile)
        .map((project) => (
          <ProjectTasks
            key={project.id}
            projectData={project}
            onAddTask={onAddTask}
            onChangeTaskStatus={onChangeTaskStatus}
            onDeleteTask={onDeleteTask}
          />
        ))}
    </div>
  );
};

export default CentralComponent;
