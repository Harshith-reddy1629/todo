// import { Formik } from "formik";
import { Link } from "react-router-dom";
import lg from "../../Asset/todo.png";

import "./index.css";

const Login = () => (
  <div className="login-container">
    <div className="image-container">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-6114062-5059486.png"
        alt="login"
        className="login-image"
      />
    </div>
    <div className="login-card">
      <img src={lg} alt="todo" className="login-logo" />
      <form className="login-form" id="loginForm">
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input className="input" id="username" placeholder="Username" />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input className="input" id="username" placeholder="Username" />
        </div>
        <div className="input-container">
          <button className="form-btn" type="submit">
            Login
          </button>
        </div>
      </form>
      <div className="account">
        <p className="note-text">Don't have an account?</p>
        <Link className="link-item" to="/user/register">
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default Login;
