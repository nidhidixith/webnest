import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
const API_BASE_URL = 'http://localhost:8000/api/';

const DisplayProfile = () => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');  // Replace with your actual token storage key
                const response = await axios.get(`${API_BASE_URL}displayprofile/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserProfile(response.data);
                console.log(response.data);
                //console.log(userProfile.profile_pic);
                console.log("Success")
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);
    //console.log(userProfile.profile_pic);
    return (
    <>
    <BaseLayout/>
        <div>
            {userProfile && (
                <div>

                    <h1>{userProfile.username} Profile</h1>
                    <p>Firstname: {userProfile.first_name}</p>
                    <p>Lastname: {userProfile.last_name}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>Bio: {userProfile.bio}</p>
                    <p>Link: {userProfile.link}</p>
                    <p>Date of birth: {userProfile.date_of_birth}</p>
                    {/* Display Profile Picture */}
                    <p>Profile Pic:</p>
                    {userProfile.profile_pic && (
                    <img src={`http://localhost:8000${userProfile.profile_pic}`} width={150} // Set the width of the image
                                height={150} alt="Profile Picture" />
                    )}
                    {/* Add other profile fields as needed */}
                </div>
            )}
        </div>
        </>
    );
};

export default DisplayProfile;












