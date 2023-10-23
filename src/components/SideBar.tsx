import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import './SideBar.css';
import { IconContext } from 'react-icons';
import DayNightToggle from 'react-day-and-night-toggle'

const Sidebar: React.FC = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);
    const [projects, setProjects] = useState<string[]>(['ProjectA', 'ProjectB', 'ProjectC']);
    const [newProject, setNewProject] = useState<string>('');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const addProject = () => {
        if (newProject) {
            setProjects([...projects, newProject]);
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
                            onChange={() => setIsDarkMode(!isDarkMode)}
                            checked={isDarkMode}
                        />
                    </div>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
