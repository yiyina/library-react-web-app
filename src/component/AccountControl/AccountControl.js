import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, clearUser } from "../../redux/Reducers/auth-reducer.js";
import "./AccountControl.css";

const AccountControl = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = !!currentUser;

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/users/login");
  };

  return (
    <div className="account-control">
      {isLoggedIn && (
        <div className="user-info">
          <Link to="/users/profile" className="profile-link">
            <img src={currentUser.avatarUrl} alt="User Avatar" className="user-avatar" />
            <span className="username-text">{currentUser.username}</span>
          </Link>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <Link to="/users/login" className="login-link">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <span className="icon-text">Account</span>
        </Link>
      )}
    </div>
  );
};

export default AccountControl;