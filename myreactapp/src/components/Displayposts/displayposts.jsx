import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
import './displayposts.css';
import Navbar from '../Navbar/navbar.jsx';

const API_BASE_URL = 'http://localhost:8000/api/';

const calculateElapsedTime = (created_at) => {
  const now = new Date();
  const createdAtDate = new Date(created_at);
  const secondsDifference = Math.floor((now - createdAtDate) / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} seconds ago`;
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minutes ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} hours ago`;
  } else {
    return createdAtDate.toLocaleDateString();
  }
};

const PostComponent = () => {
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem('token');

  const updateElapsedTime = () => {
    setUserData((prevUserData) =>
      prevUserData.map((post) => ({
        ...post,
        elapsed_time: calculateElapsedTime(post.created_at),
      }))
    );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}posts/get-user-posts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUserData(response.data);
        // Update elapsed time every minute
        const intervalId = setInterval(updateElapsedTime, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      } catch (error) {
        console.log('Error fetching user posts');
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <>
      <div className="user-post-container">
        {userData.map((post) => (
          <div key={post.id} className="user-post">
              <button className="user-post-close-button">&times;</button>
              <div className="user-post-top-container">
                  <img src={`http://localhost:8000${post.user_details.profile_pic}`} alt="Profile Picture"/>
                  <div className="user-post-user-details">
                      <p>{post.user_details.first_name} {post.user_details.last_name}</p>
                      <p>{post.elapsed_time || calculateElapsedTime(post.created_at)}</p>
                  </div>

              </div>
              <div className="user-post-bottom-container">
                <p>{post.text}</p>
                {post.media_file && (
                  <div className="user-post-media">
                    {post.media_file.endsWith('.mp4') ||
                    post.media_file.endsWith('.mov') ||
                    post.media_file.endsWith('.avi') ? (
                      <video controls width="300">
                        <source src={`http://localhost:8000${post.media_file}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={`http://localhost:8000${post.media_file}`} alt="User Media" width="300px" height="300px" />
                    )}
                  </div>
                )}
                <div className="user-post-button-container">
                   <button>Like</button>
                   <button>Comment</button>
                   <button>Share</button>
                   <button>Repost</button>
                </div>
              </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostComponent;
