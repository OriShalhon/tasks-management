import React, { useEffect, useState } from "react";
import "./App.css";
import BoardsHeader from "./components/BoardsHeader";
import CentralComponent from "./components/CentralComponent";
import "./components/CentralComponent.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { loadBasicBoardsData } from "./store/slices/board.thunks";
import { loadProjectTasks } from "./store/slices/projectTasks.thunks";

import AddBoardModal from "./components/AddBoardModal";
import { addBoard } from "./store/slices/boardsSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

const App: React.FC = () => {
  const projects = useAppSelector((state) => state.projectTasks.projects);
  const darkMode = useAppSelector((state) => state.app.isDarkMode);
  const basicBoardsData = useAppSelector((state) => state.boards.boardsData);
  const canUndo = useAppSelector(
    (state) => state.projectTasks.history.length > 0
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadBasicBoardsData())
      .unwrap()
      .then((boardsData) => {
        const visibleBoard = boardsData.find((board) => board.isVisible);
        if (visibleBoard) {
          dispatch(loadProjectTasks(visibleBoard.id));
        }
      });
  }, [dispatch]);

  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
  const [isStatisticsVisible, setIsStatisticsVisible] = useState<boolean>(true);
  const [isDailyPlannerVisible, setIsDailyPlannerVisible] =
    useState<boolean>(true);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);

  const onToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const onToggleStatistics = () => {
    setIsStatisticsVisible(!isStatisticsVisible);
  };

  const onToggleDailyPlanner = () => {
    setIsDailyPlannerVisible(!isDailyPlannerVisible);
  };

  const openAddBoardModal = () => setIsAddBoardModalOpen(true);
  const closeAddBoardModal = () => setIsAddBoardModalOpen(false);

  const handleSaveBoard = (boardName: string, boardIcon: string) => {
    console.log(boardName, boardIcon);
    dispatch(addBoard({ boardName, boardIcon }));
  };

  return (
    <div className="App">
      <Header />
      <BoardsHeader
        onToggleSideBar={onToggleSidebar}
        basicBoardsData={basicBoardsData}
        onToggleStatistics={onToggleStatistics}
        onToggleDailyPlanner={onToggleDailyPlanner}
        isStatisticsVisible={isStatisticsVisible}
        isDailyPlannerVisible={isDailyPlannerVisible}
        onAddBoard={openAddBoardModal}
      />
      <AddBoardModal
        isOpen={isAddBoardModalOpen}
        onClose={closeAddBoardModal}
        onSave={handleSaveBoard}
      />
      <div className="App Content">
        <SideBar
          isDarkMode={darkMode}
          projects={projects}
          isSidebarVisible={isSidebarVisible}
          activeBoardName={
            basicBoardsData.find((board) => board.isVisible === true)
              ?.boardName ?? ""
          }
        />
        <CentralComponent
          projects={projects}
          isSideBarVisible={isSidebarVisible}
          isStatisticsVisible={isStatisticsVisible}
          isDailyPlannerVisible={isDailyPlannerVisible}
          canUndo={canUndo}
        />
      </div>
    </div>
  );
};

export default App;
