import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import "./animations.css";
import { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/ProtectedRoute";
import AuthUser from "./components/AuthUser";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthUser />}>
        <Route exact path="/user/login" element={<Login />} />
        <Route exact path="/user/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route exact path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
