import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./CreateTask.scss";

const CreateTask: React.FC<ICreateTaskProps> = ({ addTask }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title && !time) return;

    addTask(title, time);
    setTitle("");
    setTime("");
  };
  return (
    <div className="create-task">
      {/* <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
      /> */}
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          value={title}
          placeholder="Add a new ToDo"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateTask;
