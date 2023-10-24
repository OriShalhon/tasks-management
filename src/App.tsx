import React, {useState} from 'react';
import './App.css';
import SideBar from './components/SideBar';

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [projects, setProjects] = useState<string[]>(['ProjectA',
                                                                                                   'ProjectB',
                                                                                                   'ProjectC']);

    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    function addProject(newProject: string) {
        setProjects([...projects, newProject]);
    }

    return (
             <div className="App">
                <SideBar isDarkMode ={darkMode}
                         onChangeDarkMode = {() => toggleDarkMode()}
                         projects = {projects}
                         onAddProject = {(project:string) => addProject(project)}/>
            </div>
      );
}

export default App;
