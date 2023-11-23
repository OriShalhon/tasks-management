import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskProps, TaskStatus } from "../store/slices/projectTasksSlice";
import "./Task.css";
interface Props {
  index: number;
  task: TaskProps;
  onChangeTaskStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
  onEditTaskDescription: (taskId: number, description: string) => void;
  onExpandTask: (taskId: number) => void;
}

const Task: React.FC<Props> = ({
  index,
  task,
  onChangeTaskStatus,
  onDeleteTask,
  onEditTaskDescription,
  onExpandTask,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(task.description);

  const toggleDescription = () => {
    if (!isEditing) {
      onExpandTask(task.id);
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
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`task ${
            task.status === TaskStatus.inProgress
              ? "inProgress"
              : task.status === TaskStatus.done
              ? "complete"
              : ""
          } ${task.isExpanded ? "isSelected" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={toggleDescription}
        >
          <div>{task.headline}</div>
          {task.isExpanded && (
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
      )}
    </Draggable>
  );
};

export default Task;
