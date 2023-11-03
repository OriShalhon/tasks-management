import React from "react";
import "./Task.css";

export type TaskProps = {
  id: number;
  text: string;
  leadingTasks: number[];
  isCompleted: boolean;
  project: number;
};

interface Props {
  task: TaskProps;
  onChangeTaskStatus: (taskId: number) => void;
}

const Task: React.FC<Props> = ({ task, onChangeTaskStatus }) => {
  return (
    <div
      className={`task ${task.isCompleted ? "complete" : ""}`}
      onClick={() => onChangeTaskStatus(task.id)}
    >
      <div className="task-info">
        <div>ID: {task.id}</div>
        <div>Text: {task.text}</div>
        <div>Preconditions: {task.leadingTasks.join(", ")}</div>
      </div>
    </div>
  );
};

export default Task;
