import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import CentralComponent from "./components/CentralComponent";
import "./components/CentralComponent.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

import { loadProjectTasks } from "./store/slices/projectTasks.thunks";
import { useAppDispatch, useAppSelector } from "./store/store";

const App: React.FC = () => {
  const projects = useAppSelector((state) => state.projectTasks.projects);
  const darkMode = useAppSelector((state) => state.app.isDarkMode);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProjectTasks());
  }, [dispatch]);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const onToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="App">
      <Header onToggleSideBar={onToggleSidebar} />
      <DndProvider backend={HTML5Backend}>
        <div className="App Content">
          <SideBar
            isDarkMode={darkMode}
            projects={projects}
            isSidebarVisible={isSidebarVisible}
          />
          <CentralComponent
            projects={projects}
            isSideBarVisible={isSidebarVisible}
          />
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
