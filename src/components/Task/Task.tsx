import React from "react";
import "./Task.scss";

const Task: React.FC<ITaskProps> = ({
  todoMap,
  task,
  index,
  completeTask,
  removeTask,
  undoTask,
}) => {
  return (
    <div className="task">
      <div className="task-top">
        <h3
          className="task-title"
          style={{ textDecoration: task.done ? "line-through" : "" }}
        >
          {task.title}
        </h3>
        <p>Deadline - {task.time}</p>
      </div>
      <div className="task-btn-container">
        {task.done ? (
          <button className="btn-task" onClick={undoTask}>
            Undo
          </button>
        ) : (
          <button className="btn-task" onClick={completeTask}>
            Complete
          </button>
        )}
        <button className="btn-task" onClick={removeTask}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Task;
