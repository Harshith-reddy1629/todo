import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import "./animations.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

const App = () => {
  const isNotValidUser = !Cookies.get("jwt_token");

  return (
    <Routes>
      <Route
        exact
        path="/user/login"
        element={isNotValidUser ? <Login /> : <Navigate to="/" />}
      />
      <Route
        exact
        path="/user/register"
        element={isNotValidUser ? <Register /> : <Navigate to="/" />}
      />

      <Route
        exact
        path="/"
        element={isNotValidUser ? <Navigate to="/user/login" /> : <Home />}
      />
    </Routes>
  );
};

export default App;
