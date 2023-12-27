import { Link } from "react-router-dom";

import "./index.css";

const NotFound = () => (
  <div className="not-found">
    <h1 className="not-text">NOT FOUND</h1>
    <Link className="home-li" to="/">
      <p className="home-link">Go to Home</p>
    </Link>
  </div>
);

export default NotFound;
