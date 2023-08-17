import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, clearUser } from "../../redux/Reducers/auth-reducer.js"; // 更新路径
import "./AccountControl.css";

const AccountControl = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 使用useSelector从Redux Store中获取currentUser状态
  const currentUser = useSelector(selectCurrentUser);
  console.log("account line 15: ", currentUser);

  const handleLogout = () => {
    // 清除Redux Store中的currentUser状态
    dispatch(clearUser());
    // 导航到首页
    navigate("/users/login");
  };

  if (currentUser) {
    return (
      <div className="account-control">
        <div className="user-info">
          <Link to="/users/profile">
            <img src={currentUser.avatar} alt="User Avatar" className="user-avatar" />
            <span className="username">{currentUser.username}</span>
          </Link>
        </div>
        <button className="btn btn-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="account-control">
      <Link to="/users/login" className="btn btn-link">
        <FontAwesomeIcon icon={faUser} className="me-2" />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default AccountControl;
