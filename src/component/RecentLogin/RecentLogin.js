import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";
import "./RecentLogin.css";

function formatDate(loginTime) {
  console.log("Logintime", loginTime)
  if (!loginTime) {
    return "Never Logged in";
  }

  const month = Math.floor(loginTime / 100);
  const day = loginTime % 100;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const formattedMonth = monthNames[month - 1]; 

  return `${formattedMonth}-${day}`;
}

function RecentLogin() {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) => {
          if (a.loginTime && b.loginTime) {
            return b.loginTime - a.loginTime;
          } else if (!a.loginTime && !b.loginTime) {
            return 0;
          } else if (!a.loginTime) {
            return 1; 
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
              to={`/users/profile/${user._id}`} 
              className="recent-login-avatar-link"
            >
              <div className="recent-login-avatar">
                <img
                  src={user.avatarUrl} 
                  alt={`${user.username}'s Avatar`}
                  className="recent-login-avatar-img"
                />
                {console.log("RecentLogin: ", user)}
                <div className="avatar-username">{user.username}</div>
              </div>
            </Link>
            <div className="recent-login-info d-none d-xl-block">
              <Link
                to={`/users/profile/${user._id}`} 
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
