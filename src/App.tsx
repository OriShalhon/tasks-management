import React, { useState, useEffect } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import CentralComponent from "./components/CentralComponent";
import Header from "./components/Header";
import { useAppSelector } from "./store/store";

const App: React.FC = () => {
  const projects = useAppSelector((state) => state.projectTasks.projects);
  const darkMode = useAppSelector((state) => state.app.isDarkMode);

  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

  const onToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="App">
      <Header onToggleSideBar={onToggleSidebar} />
      <SideBar
        isDarkMode={darkMode}
        projects={projects}
        isSidebarVisible={isSidebarVisible}
      />
      <CentralComponent
        projects={projects}
      />
    </div>
  );
};

export default App;
