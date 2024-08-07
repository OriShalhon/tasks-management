import React, { useState } from "react";
import { DailyTaskProps } from "../store/slices/dailyPlannerSlice";
import DailyTask from "./DailyTask";

import "./DailyPlannerGroup.css";
interface DailyPlannerGroupProps {
  tasks: DailyTaskProps[];
}

const DailyPlannerGroup: React.FC<DailyPlannerGroupProps> = ({ tasks }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="dailyPlannerGroup">
      <button onClick={toggleExpanded}>Toggle</button>
      {isExpanded && (
        <div>
          {tasks.map((task) => (
            <DailyTask key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyPlannerGroup;
