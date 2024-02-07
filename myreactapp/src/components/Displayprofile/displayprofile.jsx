// DisplayProfile.jsx

import React, { useEffect, useState} from 'react';

import axios from 'axios';
import './displayprofile.css'; // Import your CSS file
import Navbar from '../Navbar/navbar.jsx';
import ProfilePicture from './profilepicture.jsx';
import BasicDetails from './basicdetails.jsx';
import ExternalLinks from './external_links.jsx';
import Interests from './interests.jsx';

const API_BASE_URL = 'http://localhost:8000/api/';

const DisplayProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUserProfile = (newProfile) => {
        setUserProfile(newProfile);
    };

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
            <div className="profile-container">
                {loading && <p>Loading profile...</p>}
                {userProfile && (
                    <div>
                        <ProfilePicture userProfile={userProfile} updateUserProfile={updateUserProfile}/>
                        <BasicDetails userProfile={userProfile} updateUserProfile={updateUserProfile}/>
                        <ExternalLinks userProfile={userProfile} updateUserProfile={updateUserProfile}/>
                        <Interests userProfile={userProfile} updateUserProfile={updateUserProfile}/>
                    </div>
                )}
            </div>
        </>
    );
};

export default DisplayProfile;
