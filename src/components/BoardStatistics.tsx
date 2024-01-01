import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  ProjectTasksProps,
  TaskStatus,
} from "../store/slices/projectTasksSlice";
import "./BoardStatistics.css";

interface Props {
  projects: ProjectTasksProps[];
}

const BoardStatistics: React.FC<Props> = ({ projects }) => {
  const getTaskAmountInStatus = (status: TaskStatus) => {
    let amount = 0;
    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (task.status === status) amount++;
      });
    });
    return amount;
  };

  const doneTasks = getTaskAmountInStatus(TaskStatus.done);
  const newTasks = getTaskAmountInStatus(TaskStatus.new);
  const inProgressTasks = getTaskAmountInStatus(TaskStatus.inProgress);

  const finishedPercentage = Math.round(
    (doneTasks / (doneTasks + newTasks + inProgressTasks)) * 100
  );

  return (
    <div className="boardStatistics">
      {/* <ImStatsBars /> */}
      <CircularProgressbar
        value={finishedPercentage}
        text={`${finishedPercentage}%`}
      />
    </div>
  );
};

export default BoardStatistics;
