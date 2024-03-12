import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './displaynetwork.css';
const API_BASE_URL = 'http://localhost:8000/api/';

const FollowingList = ({ isDifferentProfile = false, userId = null }) => {
  const [followingList, setFollowingList] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleProfileButtonClick = (userId) => {
    // Navigate to DisplayProfile with the post.id
      console.log('UserID from PostComponent',userId);
      navigate(`/displayprofile/${userId}`);
    };
  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        let response;
        if (isDifferentProfile) {
          console.log('different profile');
          //response = await axios.get(`${API_BASE_URL}get-profile-by-id/bio/${userId}/`);
        } else {
          const token = localStorage.getItem('token');
          response = await axios.get(`${API_BASE_URL}get-following-list`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        }

        setFollowingList(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching followers list:', error);
      }
    };

    fetchFollowingList();
  }, [isDifferentProfile, userId]);
  console.log(followingList);
  return (
    <div>
      {followingList && (
          followingList.map((following, index) => (
            <div className="each-following" key={index}>
              <img src={`http://localhost:8000${following.following_details.profile_pic}`} alt="Profile Picture"/>
              <div className="following-details">
                <button className="user-profile-button" onClick={() => handleProfileButtonClick(following.user_id)}>
                  {following.following_details.first_name} {following.following_details.last_name}
                </button>
              </div>
            </div>
          ))
        )}
    </div>
  );

};

export default FollowingList;


