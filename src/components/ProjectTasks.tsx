import React, { useState } from 'react';
import { TaskProps } from './Task';
import Task from './Task';

export type ProjectTasksProps = {
    id: number,
    tasks: TaskProps[],
    projectName: string
}

const ProjectTasks: React.FC <{projectData: ProjectTasksProps}>= ({projectData}) => {
    return(
        <>
        <h1>{projectData.projectName}</h1>
            <div className='projectTasks'>
                {projectData.tasks.map((taskData) => (
                    <Task key={taskData.id} task={taskData}/>
                ))}
            </div>
        </>
    )
}

export default ProjectTasks;
