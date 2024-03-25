import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './displaynetwork.css';
const API_BASE_URL = 'http://localhost:8000/api/';

const FollowingList = ({ isDifferentProfile = false, userId = null }) => {
  const [followingList, setFollowingList] = useState(null);
  const [followingStatus, setFollowingStatus] = useState({}); // Store following status for each follower

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleProfileButtonClick = (userId) => {
    // Navigate to DisplayProfile with the post.id
      console.log('UserID from PostComponent',userId);
      navigate(`/displayprofile/${userId}`);
    };

    const checkIfFollowing = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}check-follow/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFollowingStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: response.data.is_following,
      }));
    } catch (error) {
      console.error('Error checking if following user:', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}follow/${userId}/`, {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: true, // Change to true after following
        }));
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}follow/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: false, // Change to true after following
        }));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  useEffect(() => {
    const fetchFollowingList = async () => {
      try {
        let response;
        if (isDifferentProfile) {
          console.log('different profile');
        } else {
          const token = localStorage.getItem('token');
          response = await axios.get(`${API_BASE_URL}get-following-list`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        }

        setFollowingList(response.data);
        response.data.forEach((following) => {
          checkIfFollowing(following.user_id);
        });
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching followers list:', error);
      }
    };

    fetchFollowingList();
  }, [isDifferentProfile, userId]);

  return (
    <div>
      {followingList && followingList.length > 0 ? (
          followingList.map((following, index) => (
            <div className="each-following" key={index}>
              <img src={`http://localhost:8000${following.following_details.profile_pic}`} alt="Profile Picture"/>
              <div className="following-details">
                <button className="user-profile-button" onClick={() => handleProfileButtonClick(following.user_id)}>
                  {following.following_details.first_name} {following.following_details.last_name}
                </button>
                {!followingStatus[following.user_id] ? (
                  <button className="follow-or-unfollow-button" onClick={() => handleFollow(following.user_id)}>Follow</button>
                ) : (
                  <button className="follow-or-unfollow-button" onClick={() => handleUnfollow(following.user_id)}>Unfollow</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>0 following</p>
        )}
    </div>
  );

};

export default FollowingList;


