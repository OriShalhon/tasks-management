import React, { useState } from 'react';
import { TaskProps } from './Task';
import './CentralComponent.css'
import ProjectTasks from './ProjectTasks';

const CentralComponent: React.FC<{ projects: string[] }> = ({ projects }) => {
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

    const tasks = [taskData1, taskData2];

    return (
        <div className='centralComponent'>
            {projects.map((project, index) => (
                <ProjectTasks key={index} tasks={tasks} projectName={project}  />
            ))}
        </div>
    );
};

export default CentralComponent;


