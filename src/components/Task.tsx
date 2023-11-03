import React, {useState} from "react";
import "./Task.css";

export type TaskProps = {
  id: number;
  text: string;
  leadingTasks: number[];
  isCompleted: boolean;
  project: number;
  description: string;
};

interface Props {
  task: TaskProps;
  onChangeTaskStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const Task: React.FC<Props> = ({ task, onChangeTaskStatus, onDeleteTask }) => {
  const [description, setDescription] = useState<string>(task.description);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState<boolean>(false);

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const toggleTaskStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onChangeTaskStatus(task.id);
  };

  const deleteTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleteTask(task.id);
  }

  return (
    <div
      className={`task ${task.isCompleted ? "complete" : ""} ${isDescriptionVisible ? "isSelected" : ""}`}
      onClick={toggleDescription}
    >
      <div className="task-info">
        <div>{task.text}</div>
      </div>
      <div className="task-description">
        {isDescriptionVisible && <div>Description: {description}</div>}
      </div>
      <button className="invisible-button" onClick={toggleTaskStatus}>V</button>
      {task.isCompleted && <button className="delete-button" onClick={deleteTask}>X</button>}
    </div>
  );
};

export default Task;

