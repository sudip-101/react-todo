import React, { useState, useEffect } from "react";
import CreateTask from "../CreateTask/CreateTask";
import Task from "../Task/Task";

const Todo: React.FC = () => {
  // useEffect(() => {
  //   const json: string = localStorage.getItem("tasks") || "{}";
  //   const savedTasks = JSON.parse(json);
  //   if (savedTasks) {
  //     setTasks(savedTasks);
  //     console.log(savedTasks);
  //   }
  // }, []);
  const [todoRemaining, setTodoRemaining] = useState<number>();
  const [tasks, setTasks] = useState<ITaskArr[]>([
    // {
    //   title: "Do assignments",
    //   done: true,
    // },
    // {
    //   title: "Avoid junk foods",
    //   done: true,
    // },
    // {
    //   title: "Complete Resume Maker",
    //   done: false,
    // },
  ]);
  const [todoMap, setTodoMap] = useState<Map<string, ITaskArr[]>>(new Map([]));

  const addTask = (title: string, time: string, date: string) => {
    const newTasks = [...tasks, { title, done: false, time }];
    // const newTask = [{ title, done: false, time }];
    setTasks(newTasks);
    console.log(newTasks);
    setTodoMap(todoMap.set(date, [{ title, done: false, time }]));
    console.log(todoMap.get(date));
    console.log(todoMap);
  };

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = true;
    setTasks(newTasks);
  };

  const undoTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = false;
    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    if (window.confirm("Do you want to remove the task?"))
      newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  useEffect(() => {
    setTodoRemaining(
      (prevTodoRemaining) => tasks.filter((task) => !task.done).length
    );
  }, [tasks.length]);

  // useEffect(() => {
  //   const json = JSON.stringify(tasks);
  //   localStorage.setItem("tasks", json);
  // }, [tasks]);

  return (
    <div className="todos-box">
      <h1>ToDo List</h1>
      <h2>Pending Tasks - {todoRemaining}</h2>
      <div className="todo-list">
        {[...todoMap.keys()].map((key) => (
          <h3>{key}</h3>
        ))}
        {tasks.map((task, index) => (
          <Task
            // todoMap={todoMap}
            task={task}
            key={index}
            index={index}
            completeTask={completeTask}
            removeTask={removeTask}
            undoTask={undoTask}
          />
        ))}
      </div>
      <div className="create-task">
        <CreateTask addTask={addTask} />
      </div>
    </div>
  );
};

export default Todo;
