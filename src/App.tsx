import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import CentralComponent from "./components/CentralComponent";
import Header from "./components/Header";
import { useAppSelector, useAppDispatch } from "./store/store";
import "./components/CentralComponent.css";
import { loadProjectTasks } from "./store/slices/projectTasks.thunks";

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
    </div>
  );
};

export default App;
