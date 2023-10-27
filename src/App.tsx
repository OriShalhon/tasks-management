import React, {useState} from 'react';
import './App.css';
import SideBar from './components/SideBar';
import CentralComponent from './components/CentralComponent';

import { TaskProps } from './components/Task';
import { ProjectTasksProps } from './components/ProjectTasks';

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [projects, setProjects] = useState<string[]>(['ProjectA',
                                                        'ProjectB',
                                                        'ProjectC']);
//place holders for later actual data
    const taskData1 = {
        id: 1,
        text: 'Task 1',
        leadingTasks: [],
        isCompleted: true,
        project: 1
    }

    const taskData2 = {
        id: 2,
        text: 'Task 2',
        leadingTasks: [],
        isCompleted: true,
        project: 1
    }

    const taskData3 = {
        id: 3,
        text: 'Task 3',
        leadingTasks: [],
        isCompleted: true,
        project: 2
    }

    const taskData4 = {
        id: 4,
        text: 'Task 4',
        leadingTasks: [],
        isCompleted: false,
        project: 2
    }

    const projectTasks1: ProjectTasksProps = {
        project: 1,
        tasks: [taskData1, taskData2],
        projectName: 'ProjectA'
    }

    const projectTasks2: ProjectTasksProps = {
        project: 2,
        tasks: [taskData3, taskData4],
        projectName: 'ProjectB'
    }

    const projectTasks3: ProjectTasksProps = {
        project: 3,
        tasks: [],
        projectName: 'ProjectC'
    }

    const projectTasks: ProjectTasksProps[] = [projectTasks1, projectTasks2, projectTasks3];

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
                <CentralComponent projects = {projectTasks}/>
            </div>
      );
}

export default App;
