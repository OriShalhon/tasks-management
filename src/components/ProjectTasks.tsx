import React, { useState } from "react";
import { useDrop } from "react-dnd/dist/hooks";
import {
  TaskProps,
  addTaskToProject,
  changeProjectName,
  deleteTaskFromProject,
  editTaskDescription,
  toggleTaskComplete,
} from "../store/slices/projectTasksSlice";
import { useAppDispatch } from "../store/store";
import "./ProjectTasks.css";
import Task from "./Task";

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
  const [isEditingProjectName, setIsEditingProjectName] =
    useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>(
    projectData.projectName
  );

  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: async (item: { taskProp: TaskProps; projectId: number }) => {
      dispatch(
        deleteTaskFromProject({
          projectId: item.projectId,
          taskId: item.taskProp.id,
        })
      );
      dispatch(
        addTaskToProject({
          projectId: projectData.id,
          task: item.taskProp,
        })
      );
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleProjectNameClick = () => {
    setIsEditingProjectName(true);
  };

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProjectName(event.target.value);
  };

  const handleProjectNameKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      projectName.trim() !== ""
        ? dispatch(
            changeProjectName({
              projectId: projectData.id,
              newProjectName: projectName,
            })
          )
        : setProjectName(projectData.projectName);
      setIsEditingProjectName(false);
    }
  };

  const addTask = () => {
    if (newTask) {
      const task = {
        id: projectData.tasks.length + 1, //TODO - change behavior of id
        headline: newTask,
        leadingTasks: [],
        status: TaskStatus.new,
        projectId: projectData.id,
        description: "",
      };
      dispatch(addTaskToProject({ projectId: projectData.id, task }));
      setNewTask("");
    }
  };

  return (
    <div className="projectTasks" ref={drop}>
      <h1 onClick={handleProjectNameClick}>
        {isEditingProjectName ? (
          <input
            className="input"
            type="text"
            value={projectName}
            onChange={handleProjectNameChange}
            onKeyDown={handleProjectNameKeyDown}
            onBlur={() => setIsEditingProjectName(false)}
            autoFocus
          />
        ) : (
          projectName
        )}
      </h1>
      <div>
        <input
          className="input"
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
              dispatch(
                deleteTaskFromProject({ projectId: projectData.id, taskId })
              )
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
