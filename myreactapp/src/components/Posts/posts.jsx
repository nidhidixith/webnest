import React, { useState } from 'react';
import axios from 'axios';
import CreatePost from '../Posts/create_post.jsx';
import './posts.css';

const API_BASE_URL = 'http://localhost:8000/api/';

const UserPosts = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="create-post-container">
        <img src={`http://localhost:8000/media/user-icon.png`} alt="User Icon" className="background-image" />
        <button onClick={openModal}>Post your creations and connect with fellow creators</button>
      </div>

      {isModalOpen && <CreatePost closeModal={closeModal} />}
    </>
  );
};

export default UserPosts;
