import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { TaskProps, TaskStatus } from "../store/slices/projectTasksSlice";
import "./Task.css";

interface Props {
  task: TaskProps;
  onChangeTaskStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTaskDescription: (taskId: number, description: string) => void;
}

const Task: React.FC<Props> = ({
  task,
  onChangeTaskStatus,
  onDeleteTask,
  onEditTaskDescription,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] =
    useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(task.description);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { taskProp: task, projectId: task.projectId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const toggleDescription = () => {
    if (!isEditing) {
      setIsDescriptionVisible(!isDescriptionVisible);
    }
  };

  const toggleTaskStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChangeTaskStatus(task.id);
  };

  const deleteTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleteTask(task.id);
  };

  const handleDescriptionKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const newDescription =
        description.trim() !== "" ? description : "enter description";
      onEditTaskDescription(task.id, newDescription);
      setIsEditing(false);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <div
      ref={drag}
      className={`task ${
        task.status === TaskStatus.inProgress
          ? "inProgress"
          : task.status === TaskStatus.done
          ? "complete"
          : ""
      } ${isDescriptionVisible ? "isSelected" : ""}`}
      onClick={toggleDescription}
      style={isDragging ? { opacity: 0.5 } : { opacity: 1 }}
    >
      <div className="task-info">{task.headline}</div>
      {isDescriptionVisible && (
        <div onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <div>
              <input
                className="description-input"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                onKeyDown={handleDescriptionKeyDown}
              />
            </div>
          ) : (
            <div onClick={() => setIsEditing(true)}>
              {task.description ? task.description : "enter description"}
            </div>
          )}
        </div>
      )}

      <button className="invisible-button" onClick={toggleTaskStatus}>
        {task.status === TaskStatus.new
          ? "Start"
          : task.status === TaskStatus.inProgress
          ? "Done"
          : "Restart"}
      </button>
      {task.status === TaskStatus.done && (
        <div>
          <button className="delete-button" onClick={deleteTask}>
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
