import React from 'react';
import './ProfileOther.css';

const ProfileBanner = ({ avatar, username, bannerImage }) => {
    return (
        <div className="profile-other_banner">
            <div className="banner_info_container">
                <img src={avatar} alt="User Avatar" className="profile-other_user-avatar" />
                <h2 className="profile-other_username">{username}</h2>
                <img src={bannerImage} className="banner-image"/>
            </div>
        </div>
    );
}

export default ProfileBanner;
