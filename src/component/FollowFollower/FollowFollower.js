import React from 'react';
import { Link } from 'react-router-dom';
import '../ProfileOther/ProfileOther.css';
import './FollowFollower.css'

const FollowFollower = ({ list, avatarKey, usernameKey, label }) => {
    return (
        <div className="follow-section">
            <h3>{label}</h3>
            <div className="follow-items">
                {list.map((item, index) => (
                    <div key={index} className="follow-item">
                        <Link  className="username-link" to={`/users/profile/${item._id}`}>
                            <img src={item[avatarKey]} alt={`${item[usernameKey]} Avatar`} />
                            <div>{item[usernameKey]}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FollowFollower;
