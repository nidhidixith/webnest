import React from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onSelectSection, onLogout }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  /*const handleHomeClick = () => {
    navigate('/home');
  };

  const handleProfileClick = () => {
    navigate('/home/profile');
  };

  const handlePostsClick = () => {
    navigate('/home/displayposts');
  };*/

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Received token:', token);

      localStorage.removeItem('token');
      console.log('Removed Token:', token);

      alert('You are logged out');

      navigate('/'); // Navigate to the home page after successful logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
  <nav>
    <div className="nav-bar">
      <div className="nav-bar-content">
        {token ? (
          <>

           <button onClick={() => onSelectSection('posts')}>Home</button>
           <button onClick={() => onSelectSection('displayprofile')}>Profile</button>
           <button onClick={() => onSelectSection('displayposts')}>Posts</button>
           <button onClick={handleLogout}>Logout</button>
           {/* Add the class for centering the search button vertically */}
            <div className="nav-bar-search-button">
              <input type="text" placeholder="Search" />
            </div>


          </>
        ) : (
          <>
            <h1>LOGO</h1>
            <button>About</button>
            <button>Contact</button>
          </>
        )}
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
