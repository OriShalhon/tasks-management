import React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import {
  ProjectTasksProps,
  moveTaskToBetweenProjects,
  reorderProjects,
  reorderTasksInProject,
  undo,
} from "../store/slices/projectTasksSlice";
import { useAppDispatch } from "../store/store";
import BoardStatistics from "./BoardStatistics";
import "./CentralComponent.css";
import DailyPlanner from "./DailyPlanner";
import ProjectTasks from "./ProjectTasks";
interface Props {
  projects: ProjectTasksProps[];
  isSideBarVisible: boolean;
  isStatisticsVisible: boolean;
  isDailyPlannerVisible: boolean;
}

const CentralComponent: React.FC<Props> = ({
  projects,
  isSideBarVisible,
  isDailyPlannerVisible,
  isStatisticsVisible,
}) => {
  const dispatch = useAppDispatch();
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === "centralComponent") {
      dispatch(
        reorderProjects({
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else if (destination.droppableId === source.droppableId) {
      dispatch(
        reorderTasksInProject({
          projectId: parseInt(source.droppableId),
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    } else {
      const task = projects
        .find((project) => project.id === parseInt(source.droppableId))
        ?.tasks.find((task) => task.id === parseInt(draggableId));

      if (!task) return;
      dispatch(
        moveTaskToBetweenProjects({
          taskId: task.id,
          sourceProjectId: parseInt(source.droppableId),
          destinationProjectId: parseInt(destination.droppableId),
          destinationIndex: destination.index,
        })
      );
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="centralComponent"
          type="project"
          direction="horizontal"
        >
          {(provided) => (
            <div
              className={
                isSideBarVisible ? "centralComponent" : "centralComponent large"
              }
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {projects
                .filter((project) => project.isVisible)
                .map((project, index) => (
                  <ProjectTasks
                    key={project.id}
                    projectData={project}
                    index={index}
                  />
                ))}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "auto",
                  position: "absolute",
                  right: "0",
                }}
              >
                {/* TODO - place this in a separate component */}
                {isStatisticsVisible && <BoardStatistics projects={projects} />}
                {isDailyPlannerVisible && <DailyPlanner />}
              </div>
              <button
                className="undo-button"
                onClick={() => dispatch(undo())}
              ></button>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default CentralComponent;
