import React from "react";
import { FaPlus, FaTrash, FaArrowRight, FaEdit } from "react-icons/fa";
import { Droppable, Draggable } from "@hello-pangea/dnd";

function Column({ title, status, tasks, deleteTask, moveTask, addTask, editTask }) {

  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="column">

      <div className="column-header">

        <span>{title}</span>

        {status === "todo" && (
          <button className="add-btn" onClick={addTask}>
            <FaPlus />
          </button>
        )}

      </div>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="column-content"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {filteredTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="task"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >

                    <p>{task.title}</p>

                    <div className="task-buttons">

                      {/* Edit */}
                      <button
                        className="edit-btn"
                        onClick={() => editTask(task.id)}
                      >
                        <FaEdit />
                      </button>

                      {/* Move */}
                      {status === "todo" && (
                        <button
                          className="move-btn"
                          onClick={() => moveTask(task.id, "progress")}
                        >
                          <FaArrowRight />
                        </button>
                      )}

                      {status === "progress" && (
                        <button
                          className="move-btn"
                          onClick={() => moveTask(task.id, "done")}
                        >
                          <FaArrowRight />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}

          </div>
        )}
      </Droppable>

    </div>
  );
}

export default Column;