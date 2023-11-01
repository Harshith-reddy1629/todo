import { Formik } from "formik";

import { Link } from "react-router-dom";
import lg from "../../Asset/todo.png";

import "./index.css";

const Register = () => {
  const SubmitForm = (formValues) => {
    let url = "http://localhost:8001/register/";

    let options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
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
                  {errors.username && touched.username && errors.username}
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
                  placeholder="enter your mail"
                />
                <p className="error-text">
                  {errors.email && touched.email && errors.email}
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
                  {errors.password && touched.password && errors.password}
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
        <div className="account">
          <p className="note-text">Already have an account?</p>
          <Link className="link-item" to="/user/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
