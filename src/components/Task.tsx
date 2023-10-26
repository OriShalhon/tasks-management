import React from 'react';
import './Task.css';

export type TaskProps = {
    id: number;
    text: string;
    leadingTasks: number[];
    isCompleted: boolean;
    project: number
}

const Task: React.FC<{task:TaskProps}> = ({ task }) => {
    const leadingTask = task.leadingTasks ? task.leadingTasks : null;
    const isCompleted = task.isCompleted ? task.isCompleted : false;
    const project = task.project ? task.project : '';
    return (
        <div className={`task ${task.isCompleted ? 'complete' : ''}`}>
        <div className="task-info">
          <div>ID: {task.id}</div>
          <div>Text: {task.text}</div>
          <div>Preconditions: {task.leadingTasks.join(', ')}</div>
        </div>
      </div>
    );
}

export default Task;
