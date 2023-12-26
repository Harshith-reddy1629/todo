import { Component } from "react";
import Header from "../Header";
import pageStatus from "../../Constants/pageStatus";
import Cookies from "js-cookie";

import "./index.css";
import TaskItem from "../Task";

class Home extends Component {
  state = { status: pageStatus.inProgress, tasksList: [], addTaskValue: "" };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ status: pageStatus.inProgress });

    const Url = process.env.REACT_APP_PROJECT_API + "/todo";

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
        this.setState({ tasksList: result, status: pageStatus.success });
      } else {
        this.setState({ status: pageStatus.failed });
      }
    } catch (error) {
      this.setState({ status: pageStatus.failed });
    }
  };

  addTask = async () => {
    const { addTaskValue } = this.state;
    const Url = process.env.REACT_APP_PROJECT_API + "/todo";

    const token = Cookies.get("jwt_token");

    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: addTaskValue,
      }),
    };

    try {
      const response = await fetch(Url, options);
      if (response.ok) {
        this.setState({ addTaskValue: "" }, this.fetchData);
      }
    } catch (error) {
      this.setState({ status: pageStatus.failed });
    }
  };

  inputChange = (event) => {
    this.setState({ addTaskValue: event.target.value });
  };

  successView = () => {
    const { tasksList } = this.state;

    if (tasksList.length === 0) {
      return <p>No Tasks</p>;
    } else {
      return (
        <ul className="tasks-container">
          {tasksList.map((each) => (
            <TaskItem key={each._id} item={each} fetchData={this.fetchData} />
          ))}
        </ul>
      );
    }
  };

  toBeDisplay = () => {
    const { status } = this.state;

    switch (status) {
      case pageStatus.success:
        return this.successView();
      case pageStatus.inProgress:
        return <p>LOADING...</p>;
      case pageStatus.failed:
        return (
          <button type="button" onClick={this.fetchData}>
            Try Again
          </button>
        );

      default:
        return null;
    }
  };

  render() {
    const { addTaskValue } = this.state;

    return (
      <div>
        <Header />
        <div className="home-container">
          <div className="create-task-container">
            <h2 className="task-heading">Create Task</h2>
            <div id="addtask" className="task-container">
              <input
                onChange={this.inputChange}
                className="task-input"
                value={addTaskValue}
                placeholder="create a task"
              />
              <button onClick={this.addTask} className="add-btn" type="button">
                {" "}
                Add{" "}
              </button>
            </div>
          </div>
          <h2 className="task-heading">Your Tasks</h2>
          {this.toBeDisplay()}
        </div>
      </div>
    );
  }
}

// const Home = () => {

// };

export default Home;
