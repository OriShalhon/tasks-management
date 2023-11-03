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
  onChangeTaskStatus: (projectId: number, taskId: number) => void;
  onDeleteTask: (projectId: number, taskId: number) => void;
}

const ProjectTasks: React.FC<Props> = ({
  projectData,
  onAddTask,
  onChangeTaskStatus,
  onDeleteTask,
}) => {
  const [newTask, setNewTask] = useState<string>("");

  const addTask = () => {
    if (newTask) {
      const task = {
        id: projectData.tasks.length + 1, //TODO - change behavior of id
        headline: newTask,
        leadingTasks: [],
        isCompleted: false,
        project: projectData.id,
        description: "",
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
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add task</button>
      </div>
      <div>
        {projectData.tasks.map((taskData) => (
          <Task
            key={taskData.id}
            task={taskData}
            onChangeTaskStatus={(taskId: number) =>
              onChangeTaskStatus(projectData.id, taskId)
            }
            onDeleteTask={(taskId: number) =>
              onDeleteTask(projectData.id, taskId)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTasks;
