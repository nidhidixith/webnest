import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/navbar.jsx';
import ProfilePicture from './profilepicture.jsx';
import BasicDetails from './basicdetails.jsx';
import ExternalLinks from './external_links.jsx';
import Interests from './interests.jsx';
import PostComponent from '../Displayposts/displayposts.jsx';
import '../Displayposts/displayposts.css';
import { useParams } from 'react-router-dom';

const DisplayProfile = () => {
  const { userId } = useParams();
  const userIdInt = parseInt(userId, 10);
  const [isDifferentProfile, setIsDifferentProfile]=useState(true);
  const [isOtherUsersProfile, setIsOtherUsersProfile]=useState(true);

  console.log('UserID from DisplayProfile:',userId);
  console.log('IsDifferentProfile:',isDifferentProfile);
  console.log('isOtherUsersProfile:',isOtherUsersProfile);
//   console.log('Type of userID',typeof userId);
//   console.log('UserIDInt from DisplayProfile:',userIdInt);
//   console.log('Type of userIDInt',typeof userIdInt);
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
            <ProfilePicture />
            <BasicDetails />
            <ExternalLinks />
            <Interests />
            <div className="user-posts-heading">
              <h2>Posts</h2>
            </div>
            <PostComponent />
          </>
        )}
      </div>
    </>
  );
};

export default DisplayProfile;
