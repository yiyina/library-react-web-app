import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccountControl.css"; // Import the CSS file

const AccountControl = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState(""); // 用户头像 URL
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    const loginSuccessful = true; // 假设登录成功
    if (loginSuccessful) {
      setIsLoggedIn(true);
      setUserAvatar("https://example.com/avatar.jpg"); // 设置用户头像 URL
      setUsername("JohnDoe"); // 设置用户名
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  const handleLogout = () => {
    // 在实际项目中处理登出逻辑
    setIsLoggedIn(false);
    setUserAvatar("");
    setUsername("");
    navigate("/");
  };

  if (isLoggedIn) {
    return (
      <div className="account-control">
        <div className="user-info">
          <img src={userAvatar} alt="User Avatar" className="user-avatar" />
          <span className="username">{username}</span>
        </div>
        <button className="btn btn-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="account-control">
      <Link to="/login" className="btn btn-link">
        <FontAwesomeIcon icon={faUser} className="me-2" />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default AccountControl;
