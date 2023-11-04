import React, { useState } from "react";
import "./Task.css";
import { TaskProps } from "../store/slices/projectTasksSlice";

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
  const [description, setDescription] = useState<string>(task.description);
  const [isDescriptionVisible, setIsDescriptionVisible] =
    useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleDescriptionSave = () => {
    onEditTaskDescription(task.id, description);
    setIsEditing(false);
  };

  return (
    <div
      className={`task ${task.isCompleted ? "complete" : ""} ${
        isDescriptionVisible ? "isSelected" : ""
      }`}
      onClick={toggleDescription}
    >
      <div className="task-info">{task.headline}</div>
      <div>
        {isDescriptionVisible && (
          <div onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={description}
                  onChange={handleDescriptionChange}
                />
                <button onClick={handleDescriptionSave}>Save</button>
              </div>
            ) : (
              <div onClick={() => setIsEditing(true)}>{task.description}</div>
            )}
          </div>
        )}
      </div>
      <button className="invisible-button" onClick={toggleTaskStatus}>
        V
      </button>
      {task.isCompleted && (
        <button className="delete-button" onClick={deleteTask}>
          X
        </button>
      )}
    </div>
  );
};

export default Task;
