import React from "react";
import { useDispatch } from "react-redux";
import {
  DailyTaskProps,
  toggleTaskStatus,
} from "../store/slices/dailyPlannerSlice";
import "./DailyTask.css";

interface Props {
  task: DailyTaskProps;
}

const DailyTask: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();

  const handleTaskClick = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  return (
    <div
      className={`dailyTask ${task.isDone ? "crossed" : ""}`}
      onClick={handleTaskClick}
    >
      <p>{task.headline}</p>
    </div>
  );
};

export default DailyTask;
