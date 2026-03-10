import React, { useState, useEffect } from "react";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
  /* Load tasks from browser storage */
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  /* Save tasks whenever they change */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* Add task */
  const addTask = () => {

    const title = prompt("Enter task");

    if (!title) return;

    const newTask = {
      id: Date.now().toString(),
      title: title,
      status: "todo"
    };

    setTasks([...tasks, newTask]);
  };

  /* Delete task */
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  /* Move task with button */
  const moveTask = (id, status) => {

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  /* Edit task */
  const editTask = (id) => {

    const newTitle = prompt("Edit task");

    if (!newTitle) return;

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  /* Drag and Drop logic */
  const onDragEnd = (result) => {

    if (!result.destination) return;

    const newStatus = result.destination.droppableId;
    const taskId = result.draggableId;

    moveTask(taskId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="app">

        <div className="board">

          <Column
            title="Todo"
            status="todo"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            addTask={addTask}
            editTask={editTask}
          />

          <Column
            title="In Progress"
            status="progress"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />

          <Column
            title="Done"
            status="done"
            tasks={tasks}
            moveTask={moveTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />

        </div>

      </div>

    </DragDropContext>
  );
}

export default App;