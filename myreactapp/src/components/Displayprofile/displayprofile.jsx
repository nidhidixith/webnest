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
    return (
        <>
            <div className="profile-container">

                    <div>
                        <ProfilePicture/>
                        <BasicDetails/>
                        <ExternalLinks/>
                        <Interests/>
                    </div>

            </div>
        </>
    );
};

export default DisplayProfile;
