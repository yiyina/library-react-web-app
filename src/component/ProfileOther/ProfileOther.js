import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileOtherThunk } from '../../services/auth-thunks.js';
import { Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ProfileOther.css';
import FollowFollower from '../FollowFollower/FollowFollower.js';

const ProfileOther = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);

    const otherUserData = useSelector(state => state.user.otherUser);
    
    // Use local state to store first-loaded user data
    const [initialUserData, setInitialUserData] = useState(null);

    useEffect(() => {
        if (id) {
            // Use the obtained id to request user data
            const fetchData = async () => {
                const { payload } = await dispatch(profileOtherThunk(id));
                setInitialUserData(payload);
                console.log(payload);
            }
            fetchData();
        }
    }, [id, dispatch]);

    // Added state to store data of followUsers
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
                        return {
                            ...followData.payload,
                            _id: followId // Add this line to ensure _id is included in each user object
                        };
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
                        return {
                            ...followerData.payload,
                            _id: followerId 
                        };
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
                    <img src={initialUserData?.avatar} alt="User Avatar" className="profile-other_user-avatar" />
                    <h2 className="profile-other_username">{initialUserData?.username}</h2>
                    <img src={initialUserData?.bannerImage} className="banner-image"/>
                </div>
            </div>
            <FollowFollower list={follows} avatarKey='avatar' usernameKey='username' label='Follows' />
            <FollowFollower list={followers} avatarKey='avatar' usernameKey='username' label='Followers' />
            {renderLikesOrComments(otherUserData?.likes || [], 'Liked Books')}
            {renderLikesOrComments(otherUserData?.bookComments || [], 'Commenter Books')}
        </div>
    );
}

export default ProfileOther;