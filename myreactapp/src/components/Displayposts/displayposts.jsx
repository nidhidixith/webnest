import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
import './displayposts.css'; // Import your CSS file

const API_BASE_URL = 'http://localhost:8000/api/';

const DisplayPosts = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
    try {
    const response = await axios.get(`${API_BASE_URL}posts/get-user-posts/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
        });
        setUserData(response.data);
        //console.log(userData);
        //console.log(userData.text);
        //console.log(userData.media_file);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    fetchUserData();
  }, []); // Run once on component mount

  return (
    <>
    <BaseLayout/>
    <div>
      {userData && (
        <div>
          <h1>{userData.username}'s Posts</h1>
          <p>{userData.text}</p>
          {userData.media_file && (
            <div>
              <p>Media File:</p>
              {userData.media_file.endsWith('.mp4') ||
              userData.media_file.endsWith('.mov') ||
              userData.media_file.endsWith('.avi') ? (
                <video controls width="300">
                  <source src={`http://localhost:8000${userData.media_file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={`http://localhost:8000${userData.media_file}`} alt="User Media" width="300px" height="300px"/>
              )}
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default DisplayPosts;




