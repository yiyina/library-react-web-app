import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { addFollowToUserThunk } from '../../services/auth-thunks.js';
import './ProfileOther.css';

const ProfileBanner = ({ avatar, username, bannerImage }) => {
    const { currentUser, status } = useSelector((state) => state.user);
    const { id: profileUserId } = useParams(); 
    const [followStatus, setFollowStatus] = useState('idle');  // 'idle', 'pending', 'succeeded', 'failed
    const dispatch = useDispatch();

    const isCurrentUserFollowing = currentUser && currentUser.follows ? currentUser.follows.includes(profileUserId) : false;

    const handleFollow = async () => {
        setFollowStatus('pending');
        try {
            await dispatch(addFollowToUserThunk({ userId: profileUserId, currentUser: currentUser }));
            setFollowStatus('succeeded');
        } catch (error) {
            console.error("Error while trying to follow user:", error);
            setFollowStatus('failed');
        }
    };

    useEffect(() => {
        if (followStatus === 'succeeded') {
            alert('Successfully followed!');
        }
    }, [followStatus]);
    
    return (
        <div className="profile-other_banner">
            <div className="banner_info_container">
                <img src={avatar} alt="User Avatar" className="profile-other_user-avatar" />
                <h2 className="profile-other_username">{username}</h2>
                <img src={bannerImage} className="banner-image"/>
                { 
                    currentUser && currentUser._id !== profileUserId && (
                        isCurrentUserFollowing || followStatus === 'succeeded' ? 
                        <span>Followed</span> :
                        <button 
                            onClick={handleFollow} 
                            disabled={status === 'loading' || followStatus === 'pending' || followStatus === 'succeeded'}>
                            {followStatus === 'pending' ? 'Following...' : 'Follow Me'}
                        </button>
                    )
                }
            </div>
        </div>
    );
}

export default ProfileBanner;
