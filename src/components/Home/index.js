import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/user/login");
  };
  return (
    <div>
      HOME
      <button type="button" onClick={onLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Home;
