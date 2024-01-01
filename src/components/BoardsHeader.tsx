import React from "react";
import { FaBars } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { SlCalender } from "react-icons/sl";

import {
  BasicBoardProps,
  changeBoardVisibility,
  getIconByName,
} from "../store/slices/boardsSlice";
import { loadProjectTasks } from "../store/slices/projectTasks.thunks";
import { useAppDispatch } from "../store/store";

import "./BoardsHeader.css";

interface BoardsHeaderProps {
  onToggleSideBar: () => void;
  basicBoardsData: BasicBoardProps[];
  onToggleStatistics: () => void;
  onToggleDailyPlanner: () => void;
  isStatisticsVisible: boolean;
  isDailyPlannerVisible: boolean;
}

const BoardsHeader: React.FC<BoardsHeaderProps> = ({
  onToggleSideBar,
  basicBoardsData,
  onToggleStatistics,
  onToggleDailyPlanner,
  isStatisticsVisible,
  isDailyPlannerVisible,
}) => {
  const dispatch = useAppDispatch();

  const onChangeBoard = (boardID: number) => {
    dispatch(loadProjectTasks(boardID));
    dispatch(changeBoardVisibility({ boardId: boardID }));
  };

  return (
    <header>
      <div className="boardsHeader">
        <button className="menu-bars" onClick={onToggleSideBar}>
          <FaBars />
        </button>
        <ul>
          {basicBoardsData.map((board) => {
            const IconComponent = board.icon && getIconByName(board.icon);
            return (
              <li
                className={
                  board.isVisible ? "sidebar-item selected" : "sidebar-item"
                }
                key={board.id}
                onClick={() => onChangeBoard(board.id)}
              >
                {IconComponent ? <IconComponent /> : board.boardName}
              </li>
            );
          })}
        </ul>
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <button
            className={`dailyButton ${isDailyPlannerVisible ? "selected" : ""}`}
            onClick={onToggleDailyPlanner}
          >
            <SlCalender />
          </button>

          <button
            className={`statisticsButton ${
              isStatisticsVisible ? "selected" : ""
            }`}
            onClick={onToggleStatistics}
          >
            <ImStatsBars />
          </button>
        </div>
      </div>
    </header>
  );
};

export default BoardsHeader;
