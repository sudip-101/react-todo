import React, { useState, useEffect } from "react";
import CreateTask from "../CreateTask/CreateTask";
import Task from "../Task/Task";

const Todo: React.FC = () => {
  useEffect(() => {
    const json: string = localStorage.getItem("todoList") || "{}";
    const savedTasks = JSON.parse(json);
    if (savedTasks) {
      setTodoMap(new Map(Object.entries(savedTasks)));
    }
  }, []);
  const [todoMap, setTodoMap] = useState<Map<string, ITaskArr[]>>(new Map([]));

  const addTask = (title: string, time: string, date: string) => {
    setTodoMap((prev) => {
      const newMap = new Map(prev);
      const val = newMap.get(date);
      if (val) {
        const newTasks = [...val, { title, done: false, time }].sort((a, b) =>
          a.time.localeCompare(b.time)
        );
        updateLocalStorage(newMap.set(date, newTasks));
        return newMap.set(date, newTasks);
      }
      updateLocalStorage(newMap.set(date, [{ title, done: false, time }]));
      return newMap.set(date, [{ title, done: false, time }]);
    });
  };

  const completeTask = (index: number, date: string, done: boolean) => {
    setTodoMap((prev) => {
      const newMap = new Map(prev);
      const value = newMap.get(date);
      if (value) {
        value[index].done = done;
        updateLocalStorage(newMap.set(date, [...value]));
        return newMap.set(date, [...value]);
      }
      return newMap;
    });
  };

  const removeTask = (index: number, date: string) => {
    if (window.confirm("Do you want to remove the task?"))
      setTodoMap((prev) => {
        const newMap = new Map(prev);
        console.log(newMap);
        const value = newMap.get(date);
        console.log(value);
        if (value) {
          const newVal = value.filter((obj, i) => i !== index);
          console.log(newVal);
          if (newVal.length === 0) {
            newMap.delete(date);
            console.log(newMap);
            updateLocalStorage(newMap);
            return newMap;
          }
          updateLocalStorage(newMap.set(date, [...newVal]));
          return newMap.set(date, [...newVal]);
        }
        return newMap;
      });
  };

  const updateLocalStorage = (localMap: Map<string, ITaskArr[]>) => {
    const obj = Object.fromEntries(localMap);
    const json = JSON.stringify(obj);
    localStorage.setItem("todoList", json);
  };

  const todoRemaining = React.useCallback(
    (key: string) => {
      const val = todoMap.get(key);
      if (val) return val.filter((i) => !i.done).length;
      return 0;
    },
    [todoMap]
  );

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
            <p className="pending-task">Pending Tasks - {todoRemaining(key)}</p>
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
