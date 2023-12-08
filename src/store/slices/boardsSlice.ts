import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadBoardDataReducers } from "./board.thunks";
import { ProjectTasksProps } from "./projectTasksSlice";

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

const boardSlice = createSlice({
  name: "boards",
  initialState: {
    boardsData: [],
  } as BasicBoardsState,
  reducers: {
    addBoard(state, action: PayloadAction<string>) {
      let newBoard: BasicBoardProps = {
        id: state.boardsData.length + 1,
        boardName: action.payload,
        isVisible: false,
      };
      state.boardsData.push(newBoard);
    },
    removeBoard(state, action: PayloadAction<{ boardId: number }>) {
      state.boardsData = state.boardsData.filter(
        (board) => board.id !== action.payload.boardId
      );
    },
    changeBoardVisibility(state, action: PayloadAction<{ boardId: number }>) {
      const { boardId } = action.payload;
      state.boardsData.forEach((board) => {
        board.isVisible = board.id === boardId;
      });
    },
  },
  extraReducers(builer) {
    loadBoardDataReducers(builer);
  },
});

export const { addBoard, removeBoard, changeBoardVisibility } =
  boardSlice.actions;
export default boardSlice.reducer;
