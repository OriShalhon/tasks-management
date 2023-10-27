import React, { useState } from 'react';
import './SideBar.css';
import { IconContext } from 'react-icons';
import  { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ProjectTasksProps } from './ProjectTasks';

interface Props {
    isDarkMode: boolean,
    onChangeDarkMode: () => void,
    projects: ProjectTasksProps[],
    onAddProject: (newProject: string) => void
    isSidebarVisible: boolean
}
const Sidebar: React.FC<Props> = ({isDarkMode, onChangeDarkMode,
                                projects, onAddProject,
                                isSidebarVisible}) => {
                                 
    const [newProject, setNewProject] = useState<string>('');
   
    const addProject = () => {
        if (newProject) {
            onAddProject(newProject);
            setNewProject('');
        }
    };

    return (
        <>
            <IconContext.Provider value={{ color: '#696969' }}>
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
