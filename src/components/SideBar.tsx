import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import './SideBar.css';
import { IconContext } from 'react-icons';
import DayNightToggle from 'react-day-and-night-toggle'

interface Props {
    isDarkMode: boolean,
    onChangeDarkMode: () => void,
    projects: string[],
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
                            {projects.map((project, index) => (
                                <li key={index}>{project}</li>
                            ))}
                        </ul>
                        <DayNightToggle
                            onChange={onChangeDarkMode}
                            checked={isDarkMode}
                        />
                    </div>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
