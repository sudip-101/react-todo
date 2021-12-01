import React, { useState, useEffect } from "react";
import CreateTask from "../CreateTask/CreateTask";
import Task from "../Task/Task";

const Todo: React.FC = () => {
  // useEffect(() => {
  //   const json: string = localStorage.getItem("todoList") || "[]";
  //   const savedTasks = JSON.parse(json);
  //   console.log(json);
  //   if (savedTasks) {
  //     setTodoMap(new Map(savedTasks));
  //     console.log(savedTasks);
  //   }
  // }, []);
  const [todoMap, setTodoMap] = useState<Map<string, ITaskArr[]>>(new Map([]));

  const addTask = (title: string, time: string, date: string) => {
    setTodoMap((prev) => {
      const newMap = new Map(prev);
      const val = newMap.get(date);
      if (val) return newMap.set(date, [...val, { title, done: false, time }]);
      return newMap.set(date, [{ title, done: false, time }]);
    });
    updateLocalStorage(todoMap);
  };

  const completeTask = (index: number, date: string, done: boolean) => {
    setTodoMap((prev) => {
      const newMap = new Map(prev);
      const value = newMap.get(date);
      if (value) {
        value[index].done = done;
        return newMap.set(date, [...value]);
      }
      return newMap;
    });
    updateLocalStorage(todoMap);
  };

  const removeTask = (index: number, date: string) => {
    setTodoMap((prev) => {
      const newMap = new Map(prev);
      const value = newMap.get(date);
      if (value) {
        if (window.confirm("Do you want to remove the task?"))
          value.splice(index, 1);
        return newMap.set(date, [...value]);
      }
      return newMap;
    });
    updateLocalStorage(todoMap);
  };

  const updateLocalStorage = (localMap: Map<string, ITaskArr[]>) => {
    const json = JSON.stringify(localMap);
    localStorage.setItem("todoList", json);
  };

  const todoRemaining = React.useMemo(() => {
    const today = new Date();
    const val = todoMap.get(today.toISOString());
    if (val) return val.filter((i) => i.done).length;
    return 0;
  }, [todoMap]);

  return (
    <div className="todos-box">
      <div className="header">
        <h1 className="logo">To-Do Taker</h1>
      </div>
      <div className="create-task-container">
        <CreateTask addTask={addTask} />
      </div>
      <div className="todo-card-container">
        {[...todoMap.keys()].map((key) => (
          <div className="card">
            <h2>{key}</h2>
            <p className="pending-task">Pending Tasks - {todoRemaining}</p>
            <div className="task-container">
              {todoMap.get(key)?.map((task, index) => (
                <Task
                  todoMap={todoMap}
                  task={task}
                  key={index}
                  index={index}
                  completeTask={() => completeTask(index, key, true)}
                  removeTask={() => removeTask(index, key)}
                  undoTask={() => completeTask(index, key, false)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
