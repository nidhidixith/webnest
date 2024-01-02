// BaseLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './baselayout.css';
import Logout from '../../Pages/Logout/logout';

const BaseLayout = () => {
    const token = localStorage.getItem('token');
  return (
    <div>
      <header className="site-header">
        <nav className="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarToggle"
              aria-controls="navbarToggle"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggle">
              <div className="navbar-nav mr-auto">

                <a className="nav-item nav-link" href="#">About</a>

              </div>


            <div className="navbar-nav">
                {token ? (
                  <>
                     <div className="navbar-nav mr-auto">
                    <a className="nav-item nav-link" href="/posts">Home</a>
                    </div>
                    <a className="nav-item nav-link" href="/displayprofile">
                      Profile
                    </a>
                    <a className="nav-item nav-link" href="/displayposts">Posts</a>
                    <Logout />
                  </>
                ) : (
                  <>
                    <a className="nav-item nav-link" href="/login">
                      Login
                    </a>
                    <a className="nav-item nav-link" href="/signup">
                      Register
                    </a>
                  </>
                )}
             </div>
            </div>
          </div>
        </nav>
      </header>
      <main role="main" className="container">

      </main>

      {/* Optional JavaScript */}
      {/* jQuery, Popper.js, Bootstrap JS */}
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>

      <footer>

      </footer>
    </div>
  );
};

export default BaseLayout;
