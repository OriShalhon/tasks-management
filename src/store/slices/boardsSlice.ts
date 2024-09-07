import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IoBriefcaseOutline,
  IoHomeOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { loadBoardDataReducers } from "./board.thunks";
import { ProjectTasksProps } from "./projectTasksSlice";

export const iconMap: { [key: string]: React.ComponentType } = {
  work: IoBriefcaseOutline,
  school: IoSchoolOutline,
  home: IoHomeOutline,
};

export type BasicBoardProps = {
  id: number;
  boardName: string;
  isVisible: boolean;
  icon?: string;
};

export type BoardProps = BasicBoardProps & {
  projects: ProjectTasksProps[];
};

export interface BasicBoardsState {
  boardsData: BasicBoardProps[];
}

const withSaveToHistory = <T>(reducer: (state: BasicBoardsState, action: PayloadAction<T>) => void) => ({
  reducer,
  prepare: (payload: T) => ({
    payload,
    meta: { saveToHistory: true }
  })
});

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    boardsData: [],
  } as BasicBoardsState,
  reducers: {
    addBoard: withSaveToHistory<{boardName : string; boardIcon : string}>((state, action) => {
      let newBoard: BoardProps = {
        id: state.boardsData.length + 1,
        boardName: action.payload.boardName,
        icon: action.payload.boardIcon,
        isVisible: false,
        projects: [],
      };
      state.boardsData.push(newBoard);
    }),
    removeBoard: withSaveToHistory<{ boardId: number }>((state, action) => {
      state.boardsData = state.boardsData.filter(
        (board) => board.id !== action.payload.boardId
      );
    }),
    changeBoardVisibility: withSaveToHistory<{ boardId: number }>((state, action) => {
      const { boardId } = action.payload;
      state.boardsData.forEach((board) => {
        board.isVisible = board.id === boardId;
      });
    }),
  },
  extraReducers(builer) {
    loadBoardDataReducers(builer);
  },
});

export const { addBoard, removeBoard, changeBoardVisibility } =
  boardSlice.actions;
export default boardSlice.reducer;

export const getIconByName = (iconName: string): React.ComponentType => {
  const icon = iconMap[iconName];
  return icon;
};
