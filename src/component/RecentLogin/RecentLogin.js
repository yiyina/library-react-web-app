import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";
import "./RecentLogin.css";

function formatDate(loginTime) {
  if (!loginTime) {
    return "Never Logged in";
  }

  const date = new Date();
  date.setMonth(7); // 8月
  date.setDate(17); // 17日
  date.setFullYear(1970); // 设置年份为1970，因为时间戳是以秒为单位

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function RecentLogin() {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // Fetch recent users data from backend API
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the backend response is an array of user objects
        // with properties like 'username', 'loginTime', etc.
        const sortedUsers = data.sort((a, b) => {
          if (a.loginTime && b.loginTime) {
            return b.loginTime - a.loginTime;
          } else if (!a.loginTime && !b.loginTime) {
            return 0;
          } else if (!a.loginTime) {
            return 1; // Put users without loginTime at the end
          } else {
            return -1;
          }
        });
        const slicedUsers = sortedUsers.slice(0, 10);
        setRecentUsers(slicedUsers);
      })
      .catch((error) => {
        console.error("Error fetching recent users:", error);
      });
  }, []);

  return (
    <div className="recent-login-container">
      
      <div className="recent-login-list">
        <div className="recent-login-title">
          <FontAwesomeIcon icon={faUserClock} className="recent-login-title-icon" />
          <h2>Recent Logins</h2>
        </div>
        {recentUsers.map((user) => (
          <div key={user._id} className="recent-login-item">
            <Link
              to={`/profile/${user._id}`} // Replace with the actual link
              className="recent-login-avatar-link"
            >
              <div className="recent-login-avatar">
                <img
                  src={user.avatarUrl} // Replace with the actual avatar URL
                  alt={`${user.username}'s Avatar`}
                  className="recent-login-avatar-img"
                />
                <div className="avatar-username">{user.username}</div>
              </div>
            </Link>
            <div className="recent-login-info d-none d-lg-block">
              <Link
                to={`/profile/${user._id}`} // Replace with the actual link
                className="recent-login-username"
              >
                {user.username}
              </Link>
              <div className="recent-login-time">
                {formatDate(user.loginTime)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentLogin;
