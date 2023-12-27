import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import "./animations.css";
import { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

const App = () => {
  const [isNotValidUser, setValidator] = useState(!Cookies.get("jwt_token"));

  const Location = useLocation();
  useEffect(() => {
    setValidator(!Cookies.get("jwt_token"));
  }, [Location]);

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
