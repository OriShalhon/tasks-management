import React, { useState } from 'react';
import { TaskProps } from './Task';
import Task from './Task';

const ProjectTasks: React.FC <{tasks: TaskProps[], projectName: string}>= ({tasks, projectName}) => {
    return(
        <>
        <h1>{projectName}</h1>
            <div className='projectTasks'>
                {tasks.map((taskData, index) => (
                    <Task task={taskData}/>
                ))}
            </div>
        </>
    )
}

export default ProjectTasks;
