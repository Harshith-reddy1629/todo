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
      <Route exact path="/user">
        <Route exact path="login" element={<Login />} />
        <Route exact path="register" element={<Register />} />
      </Route>

      <Route exact path="/" element={<Navigate to="/user/login" />} />
    </Routes>
  );
};

export default App;
