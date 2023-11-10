import React, { useState } from "react";
import Task from "./Task";
import "./ProjectTasks.css";
import { useAppDispatch } from "../store/store";
import {
  addTaskToProject,
  toggleTaskComplete,
  deleteTask,
  editTaskDescription,
} from "../store/slices/projectTasksSlice";

import {
  ProjectTasksProps,
  TaskStatus,
} from "../store/slices/projectTasksSlice";
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
        status: TaskStatus.new,
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
          className="newTaskInput"
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />
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
            onEditTaskDescription={(taskId: number, description: string) =>
              dispatch(
                editTaskDescription({
                  projectId: projectData.id,
                  taskId,
                  description,
                })
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTasks;
