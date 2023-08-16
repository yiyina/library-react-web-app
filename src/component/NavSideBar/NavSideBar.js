import React from "react";
import { Link, useLocation } from "react-router-dom";
import { faHome, faSearch, faUser, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavSideBar.css"; // Import the CSS file

function NavSideBar({ toggleDarkMode, darkMode }) {
  const { pathname } = useLocation();
  const [ignore, active] = pathname.split("/");

  const links = [
    { name: "home", icon: faHome },
    { name: "search", icon: faSearch},
    { name: "profile", icon: faUser }
  ];

  return (
    <div className={`list-group ${darkMode ? 'dark' : 'light'}`}>
      {links.map((link) =>
          <Link to={`/${link.name}`} className={`list-group-item text-capitalize ${active === link.name ? "active" : ""}`}>
            <FontAwesomeIcon icon={link.icon} className="me-2" />
            <span className="d-none d-sm-inline">{link.name}</span>
          </Link>
      )}
      <Link to="#" className={`list-group-item ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faMoon : faSun} className="me-2" />
        <span className="d-none d-sm-inline">{darkMode ? "Dark Mode" : "Light Mode"}</span>
      </Link>
    </div>
  );
}

export default NavSideBar;
