import Header from "../Header";
import tasks from "../../Constants/DummyTasks";

import "./index.css";
import TaskItem from "../Task";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="create-task-container">
          <h2 className="task-heading">Create Task</h2>
          <input className="task-input" placeholder="create a task" />
        </div>
        <h2 className="task-heading">Your Tasks</h2>
        <ul className="tasks-container">
          {tasks.map((each) => (
            <TaskItem key={each._id} item={each} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
