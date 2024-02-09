import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './displayprofile.css'; // Import your CSS file
import EditBio from '../EditProfile/edit_bio.jsx'; // Import the EditProfile component

const API_BASE_URL = 'http://localhost:8000/api/';

const BasicDetails = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateUserProfile = (newProfile) => {
        setUserProfile(newProfile);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}get-profile/bio`, {
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

    const [isEditing, setIsEditing] = useState(false);
    const [editComponent, setEditComponent] = useState('');

    const handleEditClick = (component) => {
        setIsEditing(true);
        setEditComponent(component);
    };

    return (
        <>
           {userProfile && (
            <div className="bio-container">

                <div className="bio-field">
                    <h2 className="bio-h2">Bio</h2>
                    <p>{userProfile.bio}</p>
                </div>

                    <button
                        className="edit-bio-button"
                        onClick={() => handleEditClick('edit_bio')}
                    >
                    Edit
                    </button>

                {isEditing  && editComponent && <EditBio renderComponent={editComponent}
                onEditCancel={() => setIsEditing(false)}
                updateUserProfile={updateUserProfile}/>}
            </div>
           )}
        </>
    );
};

export default BasicDetails;
