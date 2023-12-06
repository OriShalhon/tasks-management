import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import projectDummies from "../../utils/projectsTasksInfo.json";
import { BasicBoardProps, BasicBoardsState } from "./boardsSlice";

export const loadBasicBoardsData = createAsyncThunk(
  "Boards/loadBoardsData",

  async () => {
    const basicBoardDataList: BasicBoardProps[] = projectDummies.boards.map(
      (board) => {
        return {
          id: board.id,
          boardName: board.boardName,
          isVisible: board.isVisible,
        };
      }
    );
    return basicBoardDataList;
  }
);

export const loadBoardDataReducers = (
  builder: ActionReducerMapBuilder<BasicBoardsState>
) => {
  builder.addCase(loadBasicBoardsData.pending, () => {
    // called loadProjectTasks - this is performed when the action is dispatched and not done yet
    console.log("started reading basic boards info");
  });
  builder.addCase(loadBasicBoardsData.rejected, () => {
    // this is performed when the action is dispatched and failed
    console.log("failed to read json file");
  });
  builder.addCase(loadBasicBoardsData.fulfilled, (state, action) => {
    state.boardsData = action.payload;
  });
};
