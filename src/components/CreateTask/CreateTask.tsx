import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./CreateTask.scss";
import moment from "moment";

const CreateTask: React.FC<ICreateTaskProps> = ({ addTask }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title && !time) return;

    addTask(title, time, moment(startDate).format("Do MMMM YYYY"));
    setTitle("");
    setTime("");
  };
  return (
    <div className="create-task">
      <div className="date-picker">
        <p>Add a Date -</p>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          dateFormat={"dd/MM/yyyy"}
          minDate={new Date()}
        />
      </div>
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-detail new-todo">
          <label htmlFor="todo">Add a New To-Do :</label>
          <input
            className="form-input"
            type="text"
            value={title}
            name="todo"
            id="todo"
            placeholder="Enter a To-Do"
            onChange={(e) => setTitle(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-detail todo-time">
          <label htmlFor="time">Enter Deadline :</label>
          <input
            className="form-input time-input"
            type="time"
            value={time}
            name="time"
            id="time"
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="todo-save">
          <button className="submit-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
