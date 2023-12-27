import { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  MdOutlineDoneOutline,
  MdOutlineStar,
  MdOutlineStarBorder,
} from "react-icons/md";
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

  const { task, _id, status, note, selected } = item;

  const [Status, setStatus] = useState(status);

  const [rename, setName] = useState(false);

  const [Task, setTask] = useState(task);

  const [Selected, setSelected] = useState(selected);

  const [Note, setNote] = useState(note);

  const [fetchStatus, setFetchStatus] = useState("Success");

  const token = Cookies.get("jwt_token");

  const oneOfPH = ExPlaceholders[Math.floor(Math.random() * 3)];

  const updateTask = async () => {
    let url = process.env.REACT_APP_PROJECT_API + `/todo/${_id}`;

    let options = {
      method: "PUT",
      headers: {
        Accept: "*/*",
        // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: Task,
        status: Status,
        selected: Selected,
        note: Note,
      }),
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        // fetchData();
        fetchTask();
      }
    } catch (error) {
      console.log("object");
    }
  };

  const fetchTask = async () => {
    setFetchStatus("Loading");

    const Url = process.env.REACT_APP_PROJECT_API + `/todo/${_id}`;

    const token = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(Url, options);
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        setNote(result.note);
        setStatus(result.status);
        setTask(result.task);
        setSelected(result.selected);
        setName(false);

        setFetchStatus("Success");
        // console.log("1", result);
      } else {
        setFetchStatus("Failed");
      }
    } catch (error) {
      setFetchStatus("Failed");
    }
  };

  const updateStatus = async (event) => {
    setStatus(event.target.value);
    // console.log(event.target.value);
    let url = process.env.REACT_APP_PROJECT_API + `/todo/${_id}`;
    let options = {
      method: "PUT",
      headers: {
        Accept: "*/*",
        // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: Task,
        status: event.target.value,
        selected: Selected,
        note: Note,
      }),
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        fetchTask();
      }
    } catch (error) {
      console.log("object");
    }
  };

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

  const changeImp = async () => {
    let url = process.env.REACT_APP_PROJECT_API + `/todo/${_id}`;

    let options = {
      method: "PUT",
      headers: {
        Accept: "*/*",
        // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: Task,
        status: Status,
        selected: !Selected,
        note: Note,
      }),
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        // fetchData();
        fetchTask();
      }
    } catch (error) {
      console.log("object");
    }
  };

  return (
    <li className="item-container">
      {fetchStatus === "Loading" && <p className="update-text">Updating...</p>}
      {fetchStatus === "Failed" && <p>Something Is wrong</p>}
      {fetchStatus === "Success" && (
        <>
          <div className="task-name-container">
            {Selected ? (
              <button className="star-btn" onClick={changeImp}>
                <MdOutlineStar color="goldenrod" size="22" />
              </button>
            ) : (
              <button className="star-btn" onClick={changeImp}>
                <MdOutlineStarBorder color="#666" size="22" />
              </button>
            )}
            {rename ? (
              <input
                className="note-input"
                value={Task}
                onChange={(event) => setTask(event.target.value)}
                autoFocus
              />
            ) : (
              <span className="task-label">{Task}</span>
            )}
          </div>
          <div className="delete-info-container">
            {rename ? (
              <button type="button" className="update-btn" onClick={updateTask}>
                <span className="mb-disable">Update</span>

                <MdOutlineDoneOutline size={12} />
              </button>
            ) : (
              <button
                type="button"
                className="update-btn"
                onClick={() => {
                  setName(!rename);
                }}
              >
                <span className="mb-disable">Rename</span>

                <AiFillEdit size={12} />
              </button>
            )}
            <button type="button" onClick={deleteTask} className="delete-btn">
              <span className="mb-disable">Delete</span>
              <AiFillDelete size={16} />
            </button>
          </div>
          <div className="options-container">
            <select
              value={Status}
              onChange={updateStatus}
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
            <div className="note-container">
              <input
                value={Note}
                onChange={(e) => setNote(e.target.value)}
                className="note-input"
                placeholder={oneOfPH}
              />
              <button type="button" className="note-btn" onClick={updateTask}>
                {" "}
                <MdOutlineDoneOutline size={12} />
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
