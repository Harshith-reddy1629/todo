import { useState, useEffect } from "react";
import "./index.css";
const TaskItem = (props) => {
  const { item } = props;
  const { task, _id, selected } = item;

  return (
    <li className="item-container">
      <input
        className="check-input"
        id={_id}
        type="checkbox"
        // checked={selected}
      />
      <label htmlFor={_id}>{task}</label>
    </li>
  );
};

export default TaskItem;
