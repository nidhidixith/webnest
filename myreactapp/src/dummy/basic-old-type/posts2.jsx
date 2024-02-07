import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './posts.css';
import BaseLayout from '../BaseLayout/baselayout';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/';

const UserPosts = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [text, setText] = useState('');
  const [media, setMedia] = useState('');

  const handlePosts = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}posts/userposts`, { text, media });
      console.log('Signup successful');

      const { token, message } = response.data;

      // Store the token securely (e.g., in local storage)
      localStorage.setItem('token', token);

      console.log('Received token:', token);
      console.log('Message:', message);

      navigate('/profile');
    } catch (error) {
      console.error('Error during signup:', error.response.data.error);
      setEmailExistsError('Email ID already exists');
      setEmailError(''); // Clear existing error message
    }
  };



  return (
  <>
  <BaseLayout/>
  <div className="posts-container">
    <div className="rounded-image">
        <img src={`http://localhost:8000/media/user-icon.png`} alt="User Icon" className="background-image"/>
    </div>
    <div className="post-media">
        <div className="content">
            <textarea placeholder="Say something" className="custom-textarea" name="text"></textarea>
            <form encType="multipart/form-data">
                <label htmlFor="file-upload" className="custom-upload-button">Media</label>
                <input type="file" id="file-upload" name="media" accept="image/*"/>
            </form>
        </div>
    </div>
  </div>
</>
  );
};

export default UserPosts;