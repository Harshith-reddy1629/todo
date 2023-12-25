import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
// import { CiCircleInfo } from "react-icons/ci";
import "./index.css";
import Cookies from "js-cookie";

const ExPlaceholders = [
  "ex:deadline XX-XX-XX ",
  "ex: important",
  "ex: -------",
];

const TaskItem = (props) => {
  const { item, fetchData } = props;
  console.log("item", item);
  const { task, _id, status } = item;
  const [Status, setStatus] = useState(status);
  const oneOfPH = ExPlaceholders[Math.floor(Math.random() * 3)];
  const token = Cookies.get("jwt_token");

  const updatetask = async (event) => {
    let url = process.env.REACT_APP_PROJECT_API + `/todo/${_id}`;
    let options = {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: "test",
        status: Status,
        selected: true,
        note: "imp",
      }),
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.log("object");
    }
  };
  //   useEffect(() => {
  //     updatetask();
  //   }, [Status]);

  const deleteTask = async () => {
    let url = process.env.REACT_APP_PROJECT_API + `/todo/${_id}`;

    let options = {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.log("something is wrong");
    }
  };

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
      <div className="delete-info-container">
        <button type="button" className="update-btn">
          <span className="mb-disable">Rename</span>
          <AiFillEdit size={12} />
        </button>
        <button type="button" onClick={deleteTask} className="delete-btn">
          <span className="mb-disable">Delete</span>
          <AiFillDelete size={16} />
        </button>
      </div>
      <div className="options-container">
        <select
          value={Status}
          onChange={(event) => setStatus(event.target.value)}
          className="select-input"
        >
          <option className="task-option" value="todo">
            todo
          </option>
          <option className="task-option" value="inprogress">
            inprogress
          </option>
          <option className="task-option" value="completed">
            completed
          </option>
        </select>
        <input className="note-input" placeholder={oneOfPH} />
      </div>
    </li>
  );
};

export default TaskItem;
