import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileOtherThunk } from '../../services/auth-thunks.js';
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ProfileOther.css';
// import Follows from '../Follows/Follows.js';

const ProfileOther = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const otherUserData = useSelector(state => state.user.otherUser);
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);

    // 新增状态，用于存储followUsers的数据
    const [followUsers, setFollowUsers] = useState([]);
    const [followers, setFollowers] = useState([]);
    
    useEffect(() => {
        console.log('otherUserData.follows:', otherUserData.follows);
        if (id) {
            dispatch(profileOtherThunk(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        const loadFollowUsers = async () => {
            const users = [];
            for (const followId of otherUserData.follows || []) {
                const user = await dispatch(profileOtherThunk(followId));
                users.push(user.payload); // 这里我们将 user.payload 添加到数组，而不是 user
            }
            setFollowUsers(users);
        };

        loadFollowUsers();
    }, [otherUserData, dispatch]);

    

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const renderFollowItems = (list, avatarKey, usernameKey, label) => {
        return (
            <div className="follow-section">
                <h3>{label}</h3>
                {list.map((item, index) => (
                    <div key={index} className="follow-item"> {/* 这里用 index 作为 key，因为 item 没有 _id */}
                        {console.log("username: ", item[usernameKey])}
                        <img src={item[avatarKey]} alt={`${item[usernameKey]} Avatar`} />
                        <span>{item[usernameKey]}</span>
                    </div>
                ))}
            </div>
        );
    };

    const renderLikesOrComments = (list, contentKey) => {
        return (
            <div className="likes-comments-section">
                <h3>{contentKey}</h3>
                <ul>
                    {list.map(item => (
                        <li key={item._id}>{item[contentKey]}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="profile-other">
            <Nav />
            <div className="profile-other_banner">
                <div className="banner_info_container">
                    <img src={otherUserData.avatar} alt="User Avatar" className="profile-other_user-avatar" />
                    <h2 className="profile-other_username">{otherUserData.username}</h2>
                    <img src={otherUserData.bannerImage} className="banner-image"/>
                </div>
            </div>
            {renderFollowItems(followUsers, 'avatar', 'username', 'Follows')}
            {/* {renderFollowItems(otherUserData.followers || [], 'avatar', 'username', 'Followers')} */}
            {renderLikesOrComments(otherUserData.likes || [], 'Liked Books')}
            {renderLikesOrComments(otherUserData.bookComments || [], 'Commenter Books')}
            {/* <Follows/> */}
        </div>
    );
}

export default ProfileOther;
