import React, { useState } from 'react';
import './CentralComponent.css'
import ProjectTasks from './ProjectTasks';
import {ProjectTasksProps} from './ProjectTasks';

const CentralComponent: React.FC<{ projects: ProjectTasksProps[]}> = ({ projects }) => {
    return (
        <div className='centralComponent'>
            {projects.map((project, index) => (
                <ProjectTasks key={index} projectData={project}  />
            ))}
        </div>
    );
};

export default CentralComponent;


