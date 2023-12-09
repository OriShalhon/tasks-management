import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import BoardsHeader from "./components/BoardsHeader";
import CentralComponent from "./components/CentralComponent";
import "./components/CentralComponent.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { loadBasicBoardsData } from "./store/slices/board.thunks";
import { loadProjectTasks } from "./store/slices/projectTasks.thunks";
import {
  moveTaskToBetweenProjects,
  reorderTasksInProject,
} from "./store/slices/projectTasksSlice";
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      dispatch(
        reorderTasksInProject({
          projectId: parseInt(source.droppableId),
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else {
      const task = projects
        .find((project) => project.id === parseInt(source.droppableId))
        ?.tasks.find((task) => task.id === parseInt(draggableId));

      if (!task) return;
      dispatch(
        moveTaskToBetweenProjects({
          taskId: task.id,
          sourceProjectId: parseInt(source.droppableId),
          destinationProjectId: parseInt(destination.droppableId),
          destinationIndex: destination.index,
        })
      );
    }
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
        <DragDropContext onDragEnd={onDragEnd}>
          <CentralComponent
            projects={projects}
            isSideBarVisible={isSidebarVisible}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
