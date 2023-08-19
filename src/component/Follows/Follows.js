import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileOtherThunk } from '../../services/auth-thunks.js';
import { useParams } from 'react-router-dom';
// import './ProfileOther.css';

const Follows = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const otherUserData = useSelector(state => state.user.otherUser);
    const status = useSelector(state => state.user.status);
    const error = useSelector(state => state.user.error);

    const [follows, setFollows] = useState([]);
    
    useEffect(() => {
        if (otherUserData) {
            console.log('otherUserData.follows:', otherUserData.follows);
        }
        if (id) {
            dispatch(profileOtherThunk(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (status === 'succeeded' && otherUserData) {
            const loadFollowsAndFollowers = async () => {
                const followIds = otherUserData.follows || [];
    
                const followsData = await Promise.all(
                    followIds.map(async followId => {
                        const followData = await dispatch(profileOtherThunk(followId));
                        return followData.payload;
                    })
                );
                setFollows(followsData);
            };
    
            loadFollowsAndFollowers();
        }
    }, [status, otherUserData, dispatch]);

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
                    <div key={index} className="follow-item"> 
                        {console.log("username: ", item[usernameKey])}
                        <img src={item[avatarKey]} alt={`${item[usernameKey]} Avatar`} />
                        <div>{item[usernameKey]}</div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="profile-other">
            {renderFollowItems(follows, 'avatar', 'username', 'Follows')}
        </div>
    );
}

export default Follows;