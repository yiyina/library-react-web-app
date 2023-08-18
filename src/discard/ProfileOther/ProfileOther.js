import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileOtherThunk } from '../../services/auth-thunks.js';
import './ProfileOther.css';
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ProfileOther = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log(id);
    const selectOtherUser = (state) => state.user.otherUser;

    const otherUserData = useSelector(selectOtherUser) || {};
    console.log(otherUserData);
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

    return (
        <div className="profile-other">
            <Nav />
            <div className="profile-other__banner">
                <img src={otherUserData.avatar} alt="User Avatar" className="profile-other__user-avatar" />
                <h2 className="profile-other__username">{otherUserData.username}</h2>
                <img src={otherUserData.bannerImage} className="banner-image" />
            </div>
            <div className="profile-other__follows">
                <h3>Follows</h3>
                { (otherUserData.follows || []).map(follow => (
                    <div key={follow._id} className="profile-other__follow">
                        <img src={follow.avatarUrl} alt="Follow Avatar" />
                        <span>{follow.username}</span>
                    </div>
                ))}
            </div>
            <div className="profile-other__followers">
                <h3>Followers</h3>
                { (otherUserData.followers || []).map(follower => (
                    <div key={follower._id} className="profile-other__follower">
                        <img src={follower.avatarUrl} alt="Follower Avatar" />
                        <span>{follower.username}</span>
                    </div>
                ))}
            </div>
            <div className="profile-other__likes">
                <h3>Likes</h3>
                <ul>
                    { (otherUserData.likes || []).map(like => (
                        <li key={like._id}>{like.content}</li>
                    ))}
                </ul>
            </div>
            <div className="profile-other__book-comments">
                <h3>Book Comments</h3>
                <ul>
                    { (otherUserData.bookComments || []).map(comment => (
                        <li key={comment._id}>{comment.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProfileOther;
