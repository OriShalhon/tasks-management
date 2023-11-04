import React, { useState } from "react";
import Task from "./Task";
import "./ProjectTasks.css";
import { useAppDispatch } from "../store/store";
import {
  addTaskToProject,
  toggleTaskComplete,
  deleteTask,
} from "../store/slices/projectTasksSlice";

import { ProjectTasksProps } from "../store/slices/projectTasksSlice";
interface Props {
  projectData: ProjectTasksProps;
}

const ProjectTasks: React.FC<Props> = ({ projectData }) => {
  const dispatch = useAppDispatch();
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
      dispatch(addTaskToProject({ projectId: projectData.id, task }));
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
              dispatch(
                toggleTaskComplete({ projectId: projectData.id, taskId })
              )
            }
            onDeleteTask={(taskId: number) =>
              dispatch(deleteTask({ projectId: projectData.id, taskId }))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTasks;
