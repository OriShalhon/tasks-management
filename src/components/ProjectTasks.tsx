import React, { useState } from 'react';
import { TaskProps } from './Task';
import Task from './Task';

export type ProjectTasksProps = {
    project: number,
    tasks: TaskProps[],
    projectName: string
}

const ProjectTasks: React.FC <{projectData: ProjectTasksProps}>= ({projectData}) => {
    return(
        <>
        <h1>{projectData.projectName}</h1>
            <div className='projectTasks'>
                {projectData.tasks.map((taskData, index) => (
                    <Task task={taskData}/>
                ))}
            </div>
        </>
    )
}

export default ProjectTasks;
