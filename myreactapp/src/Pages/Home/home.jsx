// Home.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar.jsx';
import UserPosts from '../../components/Posts/posts.jsx';
import DisplayProfile from '../../components/Displayprofile/displayprofile.jsx';
import PostComponent from '../../components/Displayposts/displayposts.jsx';
import './home.css';

const Home = () => {
  const [selectedSection, setSelectedSection] = useState('posts');

  const renderSection = () => {
    switch (selectedSection) {
      case 'posts':
        return <UserPosts />;
      case 'displayprofile':
        return <DisplayProfile />;
      case 'displayposts':
        return <PostComponent />;
      // Add more cases for other components as needed
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      <Navbar onSelectSection={(section) => setSelectedSection(section)} />
      {renderSection()}
    </div>
  );
};

export default Home;
