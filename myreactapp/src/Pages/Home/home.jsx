// Home.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar.jsx';
import UserPosts from '../../components/Posts/posts.jsx';
import DisplayProfile from '../../components/Displayprofile/displayprofile.jsx';
import PostComponent from '../../components/Displayposts/displayposts.jsx';
import './home.css';

const Home = () => {
  return (
    <>
        <UserPosts/>
    </>
  );
};

export default Home;
