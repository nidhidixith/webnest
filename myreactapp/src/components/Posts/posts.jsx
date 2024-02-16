import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePost from '../Posts/create_post.jsx';
import PostComponent from '../Displayposts/displayposts.jsx';
import Navbar from '../Navbar/navbar.jsx';
import './posts.css';

const API_BASE_URL = 'http://localhost:8000/api/';

const UserPosts = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOtherUsersPosts, setIsOtherUserPosts] = useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchOtherUsersPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}get-other-users-posts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setOtherUsersPosts(response.data);
      } catch (error) {
        console.error('Error fetching other users posts:', error);
      }
    };

  });
  return (
    <>
      <Navbar/>
      <div className="posts-outer-container">
      <div className="create-post-container">
        <img src={`http://localhost:8000/media/user-icon.png`} alt="User Icon" className="background-image" />
        <button onClick={openModal}>Post your creations and connect with fellow creators</button>
      </div>

      {isModalOpen && <CreatePost closeModal={closeModal} />}

      <PostComponent isOtherUsersPosts={isOtherUsersPosts} />
      </div>
    </>
  );
};

export default UserPosts;
