import { Formik } from "formik";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import lg from "../../Asset/todo.png";

import "./index.css";

const Register = () => {
  const [errorHandler, setErrorHandler] = useState({});
  const [isRegistered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const SubmitForm = async (formValues) => {
    let url = `${process.env.REACT_APP_PROJECT_API}/register/`;

    let options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (response.ok) {
        setRegistered(true);
      } else {
        setErrorHandler(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="image-container">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-6114062-5059486.png"
          alt="login"
          className="login-image"
        />
      </div>
      <div className="register-card">
        <img src={lg} alt="todo" className="login-logo" />
        {!isRegistered && (
          <Formik
            initialValues={{ name: "", username: "", email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required*";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.username) errors.username = "Required*";
              if (!values.name) errors.name = "Required*";
              if (!values.password) errors.password = "Required*";
              return errors;
            }}
            onSubmit={(values) => SubmitForm(values)}
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
              <form
                onSubmit={handleSubmit}
                className="register-form"
                id="loginForm"
              >
                <div className="register-input-container">
                  <label className="register-input-label" htmlFor="name">
                    NAME
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="name"
                    placeholder="Enter Your name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="error-text">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>
                <div className="register-input-container">
                  <label className="register-input-label" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />{" "}
                  <p className="error-text">
                    {(errors.username && touched.username && errors.username) ||
                      errorHandler.usernameError}
                  </p>
                </div>
                <div className="register-input-container">
                  <label className="register-input-label" htmlFor="email">
                    EMAIL
                  </label>
                  <input
                    value={values.email}
                    type="email"
                    className="input"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your mail"
                  />
                  <p className="error-text">
                    {(errors.email && touched.email && errors.email) ||
                      errorHandler.mailError}
                  </p>
                </div>
                <div className="register-input-container">
                  <label className="register-input-label" htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    className="input"
                    id="password"
                    placeholder="Password"
                  />{" "}
                  <p className="error-text">
                    {(errors.password && touched.password && errors.password) ||
                      errorHandler.passwordError}
                  </p>
                </div>
                {/* <div className="register-input-container"> */}
                <button className="form-btn" type="submit">
                  Register
                </button>
                {/* </div> */}
              </form>
            )}
          </Formik>
        )}
        {isRegistered && (
          <div className="success-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7518/7518748.png"
              alt="success"
              height="90"
            />
            <p>SUCCESSFULLY REGISTERED</p>

            <button
              onClick={() => navigate("/user/login")}
              className="successful-reg-btn"
              type="button"
            >
              LOGIN
            </button>
          </div>
        )}
        {!isRegistered && (
          <div className="account">
            <p className="note-text">Already have an account?</p>
            <Link className="link-item" to="/user/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
