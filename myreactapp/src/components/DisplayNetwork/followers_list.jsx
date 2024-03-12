import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './displaynetwork.css';
const API_BASE_URL = 'http://localhost:8000/api/';

const FollowersList = ({ isDifferentProfile = false, userId = null }) => {
  const [followersList, setFollowersList] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleProfileButtonClick = (userId) => {
    // Navigate to DisplayProfile with the post.id
      console.log('UserID from PostComponent',userId);
      navigate(`/displayprofile/${userId}`);
    };
  useEffect(() => {
    const fetchFollowersList = async () => {
      try {
        let response;
        if (isDifferentProfile) {
          console.log('different profile');
          //response = await axios.get(`${API_BASE_URL}get-profile-by-id/bio/${userId}/`);
        } else {
          const token = localStorage.getItem('token');
          response = await axios.get(`${API_BASE_URL}get-followers-list`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        }

        setFollowersList(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching followers list:', error);
      }
    };

    fetchFollowersList();
  }, [isDifferentProfile, userId]);
  console.log(followersList);
  return (
    <div>
      {followersList && (
          followersList.map((follower, index) => (
            <div className="each-follower" key={index}>
              <img src={`http://localhost:8000${follower.follower_details.profile_pic}`} alt="Profile Picture"/>
              <div className="follower-details">
                <button className="user-profile-button" onClick={() => handleProfileButtonClick(follower.user_id)}>
                  {follower.follower_details.first_name} {follower.follower_details.last_name}
                </button>
              </div>
            </div>
          ))
        )}
    </div>
  );
        {/*<div>
        {followersList && (
          followersList.map((follower, index) => (
            <div className="each-follower" key={index}>
              <img src={`http://localhost:8000${follower.follower_details.profile_pic}`} alt="Profile Picture"/>
              <div className="follower-details">
                <button className="user-profile-button" onClick={() => handleProfileButtonClick(follower.follower_details.id)}>
                  {follower.follower_details.first_name} {follower.follower_details.last_name}
                </button>
              </div>
            </div>
          ))
        )}
      </div>*/}

};

export default FollowersList;


// {followersList.map((follower, index) => (
//                 <div className="each-follower" key={index}>
//                     <img src={`http://localhost:8000${follower.user_details.profile_pic}`} alt="Profile Picture"/>
//                         <div className="follower-details">
//                             <button className="user-profile-button" onClick={() => handleProfileButtonClick(follower.user.id)}>
//                             {follower.user.first_name} {follower.user.last_name}</button>
//                         </div>
//                 </div>
//             ))}