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
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);

    const otherUserData = useSelector(state => state.user.otherUser);
    console.log('Other user data from store:', otherUserData);
    console.log('Status from store:', status);

    // 新增状态，用于存储followUsers的数据
    const [follows, setFollows] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [hasLoadedFollows, setHasLoadedFollows] = useState(false);
    const [hasLoadedFollowers, setHasLoadedFollowers] = useState(false);
    
    useEffect(() => {
        if (otherUserData) {
        }
        if (id) {
            dispatch(profileOtherThunk(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        setHasLoadedFollows(false);
        setHasLoadedFollowers(false);
    }, [id]);

    useEffect(() => {
        if (status === 'succeeded' && otherUserData && !hasLoadedFollows) {
            const loadFollows = async () => {
                const followIds = otherUserData.follows || [];
                const followsData = await Promise.all(
                    followIds.map(async followId => {
                        const followData = await dispatch(profileOtherThunk(followId));
                        return followData.payload;
                    })
                );
                setFollows(followsData);
            };
            loadFollows();
            setHasLoadedFollows(true);
        }
    }, [status, otherUserData, hasLoadedFollows, dispatch]);

    useEffect(() => {
        if (status === 'succeeded' && otherUserData && !hasLoadedFollowers) {
            const loadFollowers = async () => {
                const followerIds = otherUserData.followers || [];
                const followersData = await Promise.all(
                    followerIds.map(async followerId => {
                        const followerData = await dispatch(profileOtherThunk(followerId));
                        return followerData.payload;
                    })
                );
                setFollowers(followersData);
            };
            loadFollowers();
            setHasLoadedFollowers(true);
        }
    }, [status, otherUserData, hasLoadedFollowers, dispatch]);

    

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
                        <img src={item[avatarKey]} alt={`${item[usernameKey]} Avatar`} />
                        <div>{item[usernameKey]}</div>
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
                    {console.log('Other user data from store2:', otherUserData)}
                    <h2 className="profile-other_username">{otherUserData.username}</h2>
                    <img src={otherUserData.bannerImage} className="banner-image"/>
                </div>
            </div>
            {renderFollowItems(follows, 'avatar', 'username', 'Follows')}
            {renderFollowItems(followers, 'avatar', 'username', 'Followers')}
            {renderLikesOrComments(otherUserData.likes || [], 'Liked Books')}
            {renderLikesOrComments(otherUserData.bookComments || [], 'Commenter Books')}
            {/* <Follows/> */}
        </div>
    );
}

export default ProfileOther;