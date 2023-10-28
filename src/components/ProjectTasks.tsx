import React, { useState } from 'react';
import { TaskProps } from './Task';
import Task from './Task';
import './ProjectTasks.css';

export type ProjectTasksProps = {
    id: number,
    tasks: TaskProps[],
    projectName: string,
    isVisibile: boolean
}

const ProjectTasks: React.FC <{projectData: ProjectTasksProps}>= ({projectData}) => {
    return(
        <div className='projectTasks'>
        <h1>{projectData.projectName}</h1>
            <div className='projectTasks'>
                {projectData.tasks.map((taskData) => (
                    <Task key={taskData.id} task={taskData}/>
                ))}
            </div>
        </div>
    )
}

export default ProjectTasks;
