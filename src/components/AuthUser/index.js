import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

function AuthUser() {
  const isAuth = !Cookies.get("jwt_token");

  if (isAuth) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
}

export default AuthUser;
