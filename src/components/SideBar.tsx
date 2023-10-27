import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import './SideBar.css';
import { IconContext } from 'react-icons';
import  { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ProjectTasksProps } from './ProjectTasks';

interface Props {
    isDarkMode: boolean,
    onChangeDarkMode: () => void,
    projects: ProjectTasksProps[],
    onAddProject: (newProject: string) => void
}
const Sidebar: React.FC<Props> = ({ isDarkMode, onChangeDarkMode, projects, onAddProject}) => {
                                
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
    const [newProject, setNewProject] = useState<string>('');
   
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const addProject = () => {
        if (newProject) {
            onAddProject(newProject);
            setNewProject('');
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#696969' }}>
                <div className='sidebar menu-padding'>
                    <a className='menu-bars' onClick={toggleSidebar}>
                        <FaIcons.FaBars />
                    </a>
                </div>
                    <div className={isSidebarVisible? 'sidebar-content visible menu-padding' : 'sidebar-content'}>
                        <div className="add-project">
                            <input
                                type="text"
                                placeholder="Enter project name"
                                value={newProject}
                                onChange={(e) => setNewProject(e.target.value)}
                            />
                            <button onClick={addProject}>Add Project</button>
                        </div>
                        <ul>
                            {projects.map((project) => (
                                <li key={project.id}>{project.projectName}</li>
                            ))}
                        </ul>
                        <DarkModeSwitch
                            onChange={onChangeDarkMode}
                            checked={isDarkMode}
                            size={20}
                        />
                    </div>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
