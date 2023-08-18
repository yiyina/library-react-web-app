import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileOtherThunk } from '../../services/auth-thunks.js';
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ProfileOther.css';

const ProfileOther = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const otherUserData = useSelector(state => state.user.otherUser);
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);

    useEffect(() => {
        if (id) {
            dispatch(profileOtherThunk(id));
        }
    }, [dispatch, id]);

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
                {list.map(item => (
                    <div key={item._id} className="follow-item">
                        <img src={item[avatarKey]} alt={`${usernameKey} Avatar`} />
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
            {renderFollowItems(otherUserData.follows || [], 'avatarUrl', 'username', 'Follows')}
            {renderFollowItems(otherUserData.followers || [], 'avatarUrl', 'username', 'Followers')}
            {renderLikesOrComments(otherUserData.likes || [], 'Liked Books')}
            {renderLikesOrComments(otherUserData.bookComments || [], 'Commented Books')}
        </div>
    );
}

export default ProfileOther;