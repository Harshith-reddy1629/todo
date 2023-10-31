// import { Formik } from "formik";
import { Link } from "react-router-dom";
import lg from "../../Asset/todo.png";

import "./index.css";

const Register = () => (
  <div className="login-container">
    <div>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-6114062-5059486.png"
        alt="login"
        className="login-image"
      />
    </div>
    <div className="register-card">
      <img src={lg} alt="todo" className="login-logo" />
      <form className="register-form" id="loginForm">
        <div className="register-input-container">
          <label className="register-input-label" htmlFor="username">
            NAME
          </label>
          <input className="input" id="username" placeholder="Username" />
        </div>
        <div className="register-input-container">
          <label className="register-input-label" htmlFor="username">
            USERNAME
          </label>
          <input className="input" id="username" placeholder="Username" />
        </div>
        <div className="register-input-container">
          <label className="register-input-label" htmlFor="email">
            EMAIL
          </label>
          <input className="input" id="email" placeholder="enter your mail" />
        </div>
        <div className="register-input-container">
          <label className="register-input-label" htmlFor="username">
            USERNAME
          </label>
          <input className="input" id="username" placeholder="Username" />
        </div>
        <div className="register-input-container">
          <button className="form-btn" type="submit">
            Register
          </button>
        </div>
      </form>
      <div className="account">
        <p className="note-text">Already have an account?</p>
        <Link className="link-item" to="/register">
          Login
        </Link>
      </div>
    </div>
  </div>
);

export default Register;
