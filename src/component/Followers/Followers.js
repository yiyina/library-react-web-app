// Follows.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { profileOtherThunk } from '../../services/auth-thunks.js';

const Follows = ({ userId }) => {
    const dispatch = useDispatch();
    const [followUsers, setFollowUsers] = useState([]);

    useEffect(() => {
        const loadFollowUsers = async () => {
            const users = [];
            for (const followId of userId.follows || []) {
                const user = await dispatch(profileOtherThunk(followId));
                users.push(user.payload);
            }
            setFollowUsers(users);
        };

        loadFollowUsers();
    }, [userId, dispatch]);

    return (
        <div className="follow-section">
            <h3>Follows</h3>
            {followUsers.map((user, index) => (
                <div key={index} className="follow-item">
                    <img src={user.avatar} alt={`${user.username} Avatar`} />
                    <span>{user.username}</span>
                </div>
            ))}
        </div>
    );
};

export default Follows;
