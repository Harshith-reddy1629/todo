import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { CiCircleInfo } from "react-icons/ci";
import "./index.css";

const ExPlaceholders = [
  "ex:deadline XX-XX-XX ",
  "ex: important",
  "ex: -------",
];

const TaskItem = (props) => {
  const { item } = props;
  const { task, _id, selected, createdAt } = item;
  const oneOfPH = ExPlaceholders[Math.floor(Math.random() * 3)];

  return (
    <li className="item-container">
      <div className="task-name-container">
        <input
          className="check-input"
          id={_id}
          type="checkbox"
          // checked={selected}
        />
        <label className="task-label" htmlFor={_id}>
          {task}
        </label>
      </div>
      <select className="select-input">
        <option className="task-option">todo</option>
        <option className="task-option">inprogress</option>
        <option className="task-option">completed</option>
      </select>
      <input className="note-input" placeholder={oneOfPH} />
      <div className="ud-op-container">
        <button type="button" className="ud-op-btn">
          <AiFillEdit size={20} />
        </button>
        <button type="button" className="ud-op-btn">
          <AiFillDelete size={20} />
        </button>
      </div>
      <div className="task-info">
        <div className="info-container">
          <p className="info">Created: {createdAt.slice(0, 10)}</p>
        </div>
        <CiCircleInfo size={16} />
      </div>
    </li>
  );
};

export default TaskItem;
