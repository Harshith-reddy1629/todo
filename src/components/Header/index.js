import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import lg from "./to1.png";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/user/login");
    // window.location.reload();
  };

  return (
    <nav className="nav-bar">
      <img className="nav-image" src={lg} alt="nav logo" />
      <button type="button" className="logout-btn" onClick={onLogout}>
        LOGOUT
      </button>
    </nav>
  );
};

export default Header;
