import React, { useEffect } from "react";
import { loadDailyPlanner } from "../store/slices/dailyPlanner.thunks";
import { useAppDispatch, useAppSelector } from "../store/store";
import DailyPlannerGroup from "./DailyPlannerGroup";

import "./DailyPlanner.css";
const DailyPlanner: React.FC = () => {
  const morningPlans = useAppSelector(
    (state) => state.dailyPlanner.morningTasks
  );
  const afternoonPlans = useAppSelector(
    (state) => state.dailyPlanner.afternoonTasks
  );
  const eveningPlans = useAppSelector(
    (state) => state.dailyPlanner.eveningTasks
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadDailyPlanner());
  }, [dispatch]);

  return (
    <div className="DailyPlanner">
      <DailyPlannerGroup tasks={morningPlans} />
      <DailyPlannerGroup tasks={afternoonPlans} />
      <DailyPlannerGroup tasks={eveningPlans} />
    </div>
  );
};

export default DailyPlanner;
