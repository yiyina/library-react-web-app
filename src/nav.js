import { Link } from "react-router-dom";

function Nav() {
  const navLinkStyle = {
    fontSize: "28px", // Adjust the font size as needed
  };

  return (
    <nav className="nav nav-tabs mb-2">
      <Link className="nav-link" to="/profile" style={navLinkStyle}>
        Information
      </Link>
      <Link className="nav-link" to="/posts" style={navLinkStyle}>
        Book Likes
      </Link>
    </nav>
  );
}

export default Nav;