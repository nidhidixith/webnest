// DisplayProfile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
import './displayprofile.css'; // Import your CSS file

const API_BASE_URL = 'http://localhost:8000/api/';

const DisplayProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}displayprofile/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <>
            <BaseLayout />
            <div className="profile-container">
                {loading && <p>Loading profile...</p>}
                {userProfile && (
                    <div>
                        <h1 className="profile-header">{userProfile.first_name} {userProfile.last_name}'s Profile</h1>
                        <div className="profile-field">
                            <p>Firstname: {userProfile.first_name}</p>
                        </div>
                        <div className="profile-field">
                            <p>Lastname: {userProfile.last_name}</p>
                        </div>

                        <div className="profile-field">
                            <p>Bio: {userProfile.bio}</p>
                        </div>
                        <div className="profile-field">
                            <p>Link: {userProfile.link}</p>
                        </div>
                        <div className="profile-field">
                            <p>Date of birth: {userProfile.date_of_birth}</p>
                        </div>
                        <div className="profile-field">
                            {/* Display Profile Picture */}
                            <p>Profile Pic:</p>
                            {userProfile.profile_pic && (
                                <img
                                    className="profile-pic"
                                    src={`http://localhost:8000${userProfile.profile_pic}`}
                                    alt="Profile Picture"
                                />
                            )}
                        </div>
                        {/* Add other profile fields as needed */}
                    </div>
                )}
            </div>
            <a href="/editprofile">Edit Profile</a>
        </>
    );
};

export default DisplayProfile;
