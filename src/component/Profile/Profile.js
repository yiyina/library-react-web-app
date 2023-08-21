import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserThunk, logoutThunk, profileThunk } from "../../services/auth-thunks.js";
import Nav from "../../nav.js";
import "./Profile.css";

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState({ ...currentUser });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const save = async () => {
        if (JSON.stringify(currentUser) !== JSON.stringify(profile)) {
            const resultAction = await dispatch(updateUserThunk(profile));
            if (updateUserThunk.fulfilled.match(resultAction)) {
                setUpdateSuccess(true);
            }
        } else {
            alert('You did not change anything.');
        }
    };
    
    useEffect(() => {
        if (updateSuccess) {
            alert('Profile updated successfully!');
            setUpdateSuccess(false);
        }
    }, [updateSuccess]);

    useEffect(() => {
        const loadProfile = async () => {
            const { payload } = await dispatch(profileThunk());
            if (payload) {
                setProfile(payload);
                dispatch(setUser(payload));
            }
        };
        loadProfile();
    }, []);

    return (
        <div className="profile-container">
            <Nav />
            <div className="profile-form">
                <div className="profile-avatar-container">
                    <img
                        src={profile.avatarUrl || '/default-avatar.png'}
                        alt="User Avatar"
                        className="profile-user-avatar"
                    />
                </div>
                <label>
                    Username
                    <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    First Name
                    <input
                        type="text"
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        name="lastname"
                        value={profile.lastname}
                        onChange={handleInputChange}
                    />
                </label>
                <button className="save-button" onClick={save}>Save</button>
                <button className="logout-button"
                    onClick={() => { dispatch(logoutThunk()); navigate("/users/login"); }}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
