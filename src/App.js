import { Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import "./animations.css";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const isValidUser = !Cookies.get("jwt_token");

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route exact path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
