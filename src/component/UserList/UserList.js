import React from "react";
import { Link } from "react-router-dom"; // Import Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";
import "./UserList.css"; // Import the CSS file

const fakeUsers = [
    { id: 1, name: "User 1", lastLogin: "2023-08-01" },
    { id: 2, name: "User 2", lastLogin: "2023-08-02" },
    { id: 3, name: "User 3", lastLogin: "2023-08-03" },
    { id: 4, name: "User 4", lastLogin: "2023-08-04" },
    { id: 5, name: "User 5", lastLogin: "2023-08-05" },
    { id: 6, name: "User 6", lastLogin: "2023-08-06" },
    { id: 7, name: "User 7", lastLogin: "2023-08-07" },
    { id: 8, name: "User 8", lastLogin: "2023-08-08" },
    { id: 9, name: "User 9", lastLogin: "2023-08-09" },
    { id: 10, name: "User 10", lastLogin: "2023-08-10" },
];
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
}

function UserList() {
  const sortedUsers = fakeUsers.sort((a, b) =>
    b.lastLogin.localeCompare(a.lastLogin)
  );

  const recentUsers = sortedUsers.slice(0, 10);

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <FontAwesomeIcon icon={faUserClock} className="user-list-header-icon" />
        <h2>Recent Users</h2>
      </div>
      <div className="list-group">
        {recentUsers.map((user) => (
          <div key={user.id} className="user-list-item">
            <div className="user-avatar">
              <img
                src="path/to/avatar.jpg"
                alt={`${user.name}'s Avatar`}
                className="user-avatar-img"
              />
            </div>
            <div className="user-list-item-info">
              <Link
                  to={`/profile/${user.id}`} // Replace with the actual link
                  className="user-list-item-name">
                  {user.name}
              </Link>
              <div className="user-list-item-last-login">
                Recent Login: {formatDate(user.lastLogin)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;