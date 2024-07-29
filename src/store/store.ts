import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appSliceReducer from "./slices/appSlice";
import boardsSliceReducer from "./slices/boardsSlice";
import dailyPlannerSliceReducer from "./slices/dailyPlannerSlice";
import projectTasksSliceReducer from "./slices/projectTasksSlice";

const saveStateMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.meta?.saveToHistory) {
    console.log(
      "Reached save to history middleware with action type:",
      action.type
    );
    store.dispatch({ type: "projectTasks/saveStateToHistory" });
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    app: appSliceReducer,
    projectTasks: projectTasksSliceReducer,
    boards: boardsSliceReducer,
    dailyPlanner: dailyPlannerSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(saveStateMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
