import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './UserDashboard.css';


const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;
const USERS_BLACKLIST_URL = `${USERS_URL}/ban`;

const UserDashboard = () => {
  const [users, setUsers] = useState([]);

	const fetchUsersFromDatabase = async () => {
    try{
      const response = await fetch(`${USERS_URL}`);
      if(response.ok){
        const data = await response.json(); // Parse response body
      	setUsers(data);
      }else{
        console.error('Failed to fetch users');
      }
    }catch(error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(() => {
    fetchUsersFromDatabase();
  }, []);

  const handleMoveToBlacklist = async (userId) => {
    // Send PUT request to move user to blacklist on the server
    try {
        const response = await fetch(`${USERS_BLACKLIST_URL}/${userId}`, {
            method: 'PUT'
        });
        if(response.ok) {
            const data = await response.json();
            alert("Operation completed successfully!");
            fetchUsersFromDatabase();  // <-- 重新获取用户列表
        } else {
            console.error("Failed to perform operation");
        }
    } catch(error) {
        console.error('Error performing operation:', error);
    }
  };

	function formatDate(loginTime) {
		if (!loginTime) {
			return "Never Logged in";
		}
	
		const month = Math.floor(loginTime / 100);
		const day = loginTime % 100;
	
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const formattedMonth = monthNames[month - 1]; 
	
		return `${formattedMonth}-${day}`;
	}
  return (
    <div className="user-dashboard">
      <h1 className="dashboard-title">User Dashboard</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
						<th className="text-center align-middle">Avatar</th>
            <th className="text-center align-middle">Username</th>
            <th className="text-center align-middle">Last Login</th>
            <th className="text-center align-middle">Content Admin</th>
            <th className="text-center align-middle">Is Banned</th>
            <th className="text-center align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
							<td className="text-center align-middle">
                <img src={user.avatarUrl} alt="Avatar" width="50" height="50" />
              </td>
							
              <td className="text-center align-middle">
              <Link to={`/users/profile/${user._id}`}>
                {user.username}
                </Link>
              </td>
            	              
              <td className="text-center align-middle">{formatDate(user.loginTime)}</td>
              <td className="text-center align-middle">{user.isContentAdmin ? 'Yes' : 'No'}</td>
              <td className="text-center align-middle">{user.isBanned ? 'Yes' : 'No'}</td>
              <td className="text-center align-middle">
                {!user.isBanned && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleMoveToBlacklist(user._id)}
                  >
                    Move to Blacklist
                  </button>
                )}
								{user.isBanned && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleMoveToBlacklist(user._id)}
                  >
                    Remove from Blacklist
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;
