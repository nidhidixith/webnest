import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './posts.css';
import Navbar from '../Navbar/navbar.jsx';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/';

const UserPosts = () => {
  const [text, setText] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleMediaFileChange = (event) => {
    // Assuming only one file is selected
    setMediaFile(event.target.files[0]);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!text && !mediaFile) {
        setError('Please enter text or upload a media file.');
        return;
    }

    // Create a FormData object to send both text and media file to the server
    const formData = new FormData();
    formData.append('text', text);
    // Check if media_file is not null before appending to FormData
      if (mediaFile !== null) {
        formData.append('media_file', mediaFile);
      }
    console.log(formData);
    try {
      const response = await axios.post(`${API_BASE_URL}posts/create/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log(response.data);
      alert("Post successful");
      //navigate('/success');
    } catch (error) {
      console.error('Error during post:', error.response.data.error);
      setError(error.response.data.error || 'Unsupported file type');
    }
   };

  return (
    <>
    {error && <p className="error-message">{error}</p>}
    <div className="posts-container">
      <div className="rounded-image">
        <img src={`http://localhost:8000/media/user-icon.png`} alt="User Icon" className="background-image" />
      </div>

      <div className="post-media">
        <div className="content">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <textarea
            placeholder="Say something"
            className="custom-textarea"
            name="text"
            value={text}
            onChange={handleTextChange}
          ></textarea>

            <label htmlFor="file-upload" className="custom-upload-button">
              Media
            </label>
            <input type="file" id="file-upload" name="media" accept="image/*, video/*" onChange={handleMediaFileChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
    </>
  );

};

export default UserPosts;
