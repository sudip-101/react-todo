import React from "react";
import "./Task.scss";

const Task: React.FC<ITaskProps> = ({
  task,
  index,
  completeTask,
  removeTask,
  undoTask,
}) => {
  return (
    <div className="task">
      <h4
        className="task-title"
        style={{ textDecoration: task.done ? "line-through" : "" }}
      >
        {task.title}
      </h4>
      <p>Deadline - {task.time}</p>
      {task.done ? (
        <button onClick={() => undoTask(index)}>Undo</button>
      ) : (
        <button onClick={() => completeTask(index)}>Complete</button>
      )}
      <button onClick={() => removeTask(index)}>Remove</button>
    </div>
  );
};

export default Task;
