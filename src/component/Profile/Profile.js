import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserThunk, logoutThunk, profileThunk } from "../../services/auth-thunks.js";
import Nav from "../../nav.js";
import "./Profile.css";

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const [profile, setProfile] = useState(currentUser || {
        firstname: '',
        lastname: ''
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setProfile({
            ...profile,
            [name]: value
        });
        console.log("profile", profile);
    };

    // const save = () => {
    //     console.log("save", profile);
    //     const action =  dispatch(updateUserThunk(profile));
    //     console.log("save", action);
    //     if (updateUserThunk.fulfilled.match(action)) {
    //         alert('Profile updated successfully');
    //     } else if (updateUserThunk.rejected.match(action)) {
    //         alert('Failed to update profile');
    //     }
    // };
    const save = async () => {
        const newProfile = { ...profile };
        console.log("save", newProfile);
        await dispatch(updateUserThunk(newProfile));
    };

    useEffect( () => {
        const loadProfile = async () => {
            const { payload } = await dispatch(profileThunk());
            console.log("Inside loadProfile:", payload);
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
                        type="firstname"
                        name="firstname"
                        value={profile.firstname}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="lastname"
                        name="lastname"
                        value={profile.lastname}
                        onChange={handleInputChange}
                    />
                </label>
                
                <button className="save-button" onClick={save}>Save</button>
                <button className="logout-button" 
                    onClick={() => {dispatch(logoutThunk()); navigate("/users/login");}}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;
