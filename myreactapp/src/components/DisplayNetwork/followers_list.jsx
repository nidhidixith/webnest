import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './displaynetwork.css';
const API_BASE_URL = 'http://localhost:8000/api/';

const FollowersList = ({ isDifferentProfile = false, userId = null }) => {
  const [followersList, setFollowersList] = useState(null);
  const [followingStatus, setFollowingStatus] = useState({}); // Store following status for each follower
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleProfileButtonClick = (userId) => {
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
    const fetchFollowersList = async () => {
      try {
        let response;
        if (isDifferentProfile) {
          // Fetch followers of a different profile
        } else {
          response = await axios.get(`${API_BASE_URL}get-followers-list`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
        }
        setFollowersList(response.data);
        response.data.forEach((follower) => {
          checkIfFollowing(follower.user_id);
        });
      } catch (error) {
        console.error('Error fetching followers list:', error);
      }
    };

    fetchFollowersList();
  }, [isDifferentProfile, token]);

  return (
    <div>
      {followersList && followersList.length > 0 ? (
        followersList.map((follower, index) => (
          <div className="each-follower" key={index}>
            <img src={`http://localhost:8000${follower.follower_details.profile_pic}`} alt="Profile Picture" />
            <div className="follower-details">
              <button className="user-profile-button" onClick={() => handleProfileButtonClick(follower.user_id)}>
                {follower.follower_details.first_name} {follower.follower_details.last_name}
              </button>

                {!followingStatus[follower.user_id] ? (
                  <button className="follow-or-unfollow-button" onClick={() => handleFollow(follower.user_id)}>Follow</button>
                ) : (
                  <button className="follow-or-unfollow-button" onClick={() => handleUnfollow(follower.user_id)}>Unfollow</button>
                )}

            </div>
          </div>
        ))
      ) : (
        <div>0 followers</div>
      )}
    </div>
  );
};

export default FollowersList;
