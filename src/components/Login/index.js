import { useState } from "react";
import { Formik } from "formik";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import lg from "../../Asset/todo.png";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  const [errorMsg, setError] = useState("");

  const submitForm = async (formValues) => {
    // let url = "http://localhost:8001/login";
    let url = process.env.REACT_APP_PROJECT_API + "/login";

    let options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", result.jwtToken, {
          expires: 30,
          path: "/",
        });
        navigate("/");
        // window.location.reload();
      } else {
        setError(result.errMsg);
      }
    } catch (error) {
      setError("SomeThing is wrong, Try Again");
    }
  };

  return (
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
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.username) errors.username = "Required*";

            if (!values.password) errors.password = "Required*";
            return errors;
          }}
          onSubmit={(values) => {
            submitForm(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="login-form" id="loginForm">
              <div className="input-container">
                <label className="input-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  onFocus={() => setError("")}
                  type="text"
                  className="input"
                  id="username"
                  placeholder="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />{" "}
                <p className="error-text">
                  {errors.username && touched.username && errors.username}
                </p>
              </div>
              <div className="input-container">
                <label className="input-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  className="input"
                  id="password"
                  onFocus={() => setError("")}
                  placeholder="password"
                />{" "}
                <p className="error-text">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className="login-btn-container">
                <button className="form-btn" type="submit">
                  Login
                </button>{" "}
                <p className="error-text">{errorMsg}</p>
              </div>
            </form>
          )}
        </Formik>
        <div className="account">
          <p className="note-text">Don't have an account?</p>
          <Link className="link-item" to="/user/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
