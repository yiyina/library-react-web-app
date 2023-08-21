import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./CSS/style.css"

function Nav() {
  const { currentUser } = useSelector((state) => state.user);

  const navLinkStyle = {
    fontSize: "28px", 
    color: "#ff90bb", 
    fontWeight: "bold",
  };

  return (
    <nav className="nav nav-tabs mb-2">
      <Link className="nav-link" to="/users/profile" style={navLinkStyle}>
        Personal Information
      </Link>
      <Link className="nav-link" to={`/users/profile/${currentUser?._id}`} style={navLinkStyle}>
        Other Informations
      </Link>
    </nav>
  );
}

export default Nav;