import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/';
import './editprofile.css';
import { useNavigate } from 'react-router-dom';
import EditNameProfilePic from './edit_name_profile_pic.jsx';
import EditBio from './edit_bio';
import EditExternalLinks from './edit_external_links';
import EditInterests from './edit_interests';

import ProfilePicture from '../DisplayProfile/profilepicture.jsx';
import BasicDetails from '../DisplayProfile/basicdetails.jsx';
import ExternalLinks from '../DisplayProfile/external_links.jsx';
import DisplayProfile from '../DisplayProfile/displayprofile.jsx';

const EditProfile = () => {

};

export default EditProfile;
