import React, { useState } from "react";
import { TaskProps } from "./Task";
import Task from "./Task";
import "./ProjectTasks.css";

export type ProjectTasksProps = {
  id: number;
  tasks: TaskProps[];
  projectName: string;
  isVisibile: boolean;
};

interface Props {
  projectData: ProjectTasksProps;
  onAddTask: (newTask: TaskProps, projectID: number) => void;
}

const ProjectTasks: React.FC<Props> = ({ projectData, onAddTask }) => {
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask) {
      const task = {
        id: projectData.tasks.length + 1,
        text: newTask,
        leadingTasks: [],
        isCompleted: false,
        project: projectData.id,
      };
      onAddTask(task, projectData.id);
      setNewTask("");
    }
  };

  return (
    <div className="projectTasks">
      <h1>{projectData.projectName}</h1>
      <div>
        <input
          type="text"
          placeholder="Enter project name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add task</button>
      </div>
      <div>
        {projectData.tasks.map((taskData) => (
          <Task key={taskData.id} task={taskData} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTasks;
