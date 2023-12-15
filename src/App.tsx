import React, { useEffect, useState } from "react";
import "./App.css";
import BoardsHeader from "./components/BoardsHeader";
import CentralComponent from "./components/CentralComponent";
import "./components/CentralComponent.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { loadBasicBoardsData } from "./store/slices/board.thunks";
import { loadProjectTasks } from "./store/slices/projectTasks.thunks";

import { useAppDispatch, useAppSelector } from "./store/store";

const App: React.FC = () => {
  const projects = useAppSelector((state) => state.projectTasks.projects);
  const darkMode = useAppSelector((state) => state.app.isDarkMode);
  const basicBoardsData = useAppSelector((state) => state.boards.boardsData);

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

  const onToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="App">
      <Header />
      <BoardsHeader
        onToggleSideBar={onToggleSidebar}
        basicBoardsData={basicBoardsData}
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
        />
      </div>
    </div>
  );
};

export default App;
