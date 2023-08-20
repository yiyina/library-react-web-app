import { Link } from "react-router-dom";
import "./CSS/style.css"

function Nav() {
  const navLinkStyle = {
    fontSize: "28px", // Adjust the font size as needed
    color: "#ff90bb", // 修改为你想要的颜色
    fontWeight: "bold", // 加粗字体
  };

  return (
    <nav className="nav nav-tabs mb-2">
      <Link className="nav-link" to="/users/profile" style={navLinkStyle}>
        Information
      </Link>
      <Link className="nav-link" to="/users/profile" style={navLinkStyle}>
        Follows and Followers
      </Link>
      <Link className="nav-link" to="/users/profile" style={navLinkStyle}>
        Book Likes
      </Link>
    </nav>
  );
}

export default Nav;