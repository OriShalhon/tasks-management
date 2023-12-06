import { configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appSliceReducer from "./slices/appSlice";
import boardsSliceReducer from "./slices/boardsSlice";
import projectTasksSliceReducer from "./slices/projectTasksSlice";

const saveStateMiddleware: Middleware = (store) => (next) => (action) => {
  if (
    action.type !== "projectTasks/saveStateToHistory" &&
    action.type !== "projectTasks/undo"
  ) {
    store.dispatch({ type: "projectTasks/saveStateToHistory" });
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    app: appSliceReducer,
    projectTasks: projectTasksSliceReducer,
    boards: boardsSliceReducer,
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
