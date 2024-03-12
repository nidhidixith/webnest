import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/navbar.jsx';
import ProfilePicture from './profilepicture.jsx';
import BasicDetails from './basicdetails.jsx';
import ExternalLinks from './external_links.jsx';
import Interests from './interests.jsx';
import PostComponent from '../Displayposts/displayposts.jsx';
import DisplayNetwork from '../DisplayNetwork/displaynetwork.jsx';
import '../Displayposts/displayposts.css';
import { useParams } from 'react-router-dom';

const DisplayProfile = () => {
  const { userId } = useParams();
  const userIdInt = parseInt(userId, 10);
  const [isDifferentProfile, setIsDifferentProfile]=useState(true);
  const [isOtherUsersProfile, setIsOtherUsersProfile]=useState(true);

//   console.log('UserID from DisplayProfile:',userId);
//   console.log('IsDifferentProfile:',isDifferentProfile);
//   console.log('isOtherUsersProfile:',isOtherUsersProfile);

//   console.log('Type of userID',typeof userId);
//   console.log('UserIDInt from DisplayProfile:',userIdInt);
//   console.log('Type of userIDInt',typeof userIdInt);
  const [activeTab, setActiveTab] = useState('my-profile'); // Default active tab
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
    setIsClicked(!isClicked);
  };
  return (
    <>
      <Navbar />
      <div className="profile-container">
        {userId ? (
          <>
          <ProfilePicture isDifferentProfile={isDifferentProfile} userId={userIdInt} />
          <BasicDetails isDifferentProfile={isDifferentProfile} userId={userIdInt} />
          <ExternalLinks isDifferentProfile={isDifferentProfile} userId={userIdInt} />
          <Interests isDifferentProfile={isDifferentProfile} userId={userIdInt} />
          <PostComponent isOtherUsersProfile={isOtherUsersProfile} otherUserId={userIdInt}/>
          </>
        ) : (
          <>
            <div className="display-profile-top-buttons">
                <button className={activeTab === 'my-profile' ? 'clicked' : ''}
                    onClick={() => handleButtonClick('my-profile')}>My Profile
                </button>

              <button className={activeTab === 'my-posts' ? 'clicked' : ''}
                   onClick={() => handleButtonClick('my-posts')}>My Posts
              </button>

              <button className={activeTab === 'my-network' ? 'clicked' : ''}
                  onClick={() => handleButtonClick('my-network')}>My Network
              </button>

              <button className={activeTab === 'settings' ? 'clicked' : ''}
                  onClick={() => handleButtonClick('settings')}>Settings
              </button>
            </div>

            {activeTab === 'my-profile' &&
            <>
                <ProfilePicture />
                <BasicDetails />
                <ExternalLinks />
                <Interests />
            </>
            }

            {activeTab === 'my-posts' && <PostComponent />}
            {activeTab === 'my-network' && <DisplayNetwork />}
          </>
        )}
      </div>
    </>
  );
};

export default DisplayProfile;
