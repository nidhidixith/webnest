import React from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell, FaComment, FaHome, FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ onSelectSection, onLogout }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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
              <div className="nav-icon">
                <FaHome size={20} />
                <Link to='/posts' className="gray-link"><span className="nav-icon-label">Home</span></Link>
              </div>
              <div className="nav-icon">
                <FaUser size={20} />
                <Link to='/displayprofile' className="gray-link"><span className="nav-icon-label">Profile</span></Link>
              </div>
              <div className="nav-icon">
                <FaBell size={20} />
                <Link className="gray-link"><span className="nav-icon-label">Notifications</span></Link>
              </div>
              <div className="nav-icon">
                <FaComment size={20} />
                <Link className="gray-link"><span className="nav-icon-label">Messages</span></Link>
              </div>

              <div className="nav-icon" onClick={handleLogout}>
                <FiLogOut size={20} />
                <Link className="gray-link"><span className="nav-icon-label">Logout</span></Link>
              </div>

              {/*<button onClick={handleLogout}>Logout</button>*/}

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
