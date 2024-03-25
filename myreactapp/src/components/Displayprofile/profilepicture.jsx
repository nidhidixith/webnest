import React, { useEffect, useState } from 'react';
import './displayprofile.css';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import EditNameProfilePic from '../EditProfile/edit_name_profile_pic.jsx';
import { FaEdit } from 'react-icons/fa';

const API_BASE_URL = 'http://localhost:8000/api/';

const ProfilePicture = ({ isDifferentProfile = false, userId = null }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editComponent, setEditComponent] = useState('');
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const token = localStorage.getItem('token');

  const updateUserProfile = (newProfile) => {
    setUserProfile(newProfile);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const handleEditClick = (component) => {
    setIsEditing(true);
    setEditComponent(component);
  };

  const getFollowersFollowingCount= async() =>{
       // Access follower and following counts
       try {
        const response = await axios.get(`${API_BASE_URL}followers-following-count/${userId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const followersCount = response.data.followers_count;
        const followingCount = response.data.following_count;
        setFollowersCount(followersCount);
        setFollowingCount(followingCount);
        } catch (error) {
        console.error('Error checking if following user:', error);
      }
    }

  const getFollowersFollowingCountCurrentUser= async() =>{
       // Access follower and following counts
       try {
        const response = await axios.get(`${API_BASE_URL}current-user-followers-following-count/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const followersCount = response.data.followers_count;
        const followingCount = response.data.following_count;
        setFollowersCount(followersCount);
        setFollowingCount(followingCount);

        // Now you can use these counts in your component as needed
        console.log('Followers Count:', followersCount);
        console.log('Following Count:', followingCount);
        } catch (error) {
        console.error('Error checking if following user:', error);
      }
    }

  const handleFollow = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}follow/${userId}/`, {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setIsFollowing(true);
      getFollowersFollowingCount();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`${API_BASE_URL}follow/${userId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setIsFollowing(false);
      getFollowersFollowingCount();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let response;

        if (isDifferentProfile) {
          console.log('i am inside');
          response = await axios.get(`${API_BASE_URL}get-profile-by-id/basic-details/${userId}/`);

          const checkIfFollowing = async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}check-follow/${userId}/`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            setIsFollowing(response.data.is_following);
          } catch (error) {
            console.error('Error checking if following user:', error);
          }
        };
        checkIfFollowing();
        getFollowersFollowingCount();
        } else {
          response = await axios.get(`${API_BASE_URL}get-profile/basic-details`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          getFollowersFollowingCountCurrentUser();
        }
        setUserProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();

  }, [isDifferentProfile, userId]);

  return (
    <>
      {isDifferentProfile ? (
        userProfile && (
          <div className="profile-pic-container">
            <img
              className="profile-pic"
              src={`http://localhost:8000${userProfile.profile_pic}`}
              alt="Profile Picture"
            />
            <div className="profile-details">
              <div className="name-field">
                <p>{userProfile.first_name} {userProfile.last_name}</p>
              </div>
              <div className="rating-container">
                <Rating
                  count={5}
                  value={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
              <div className="follow-button-container">
                {!isFollowing ? (
                  <button onClick={handleFollow}>Follow</button>
                ) : (
                  <button onClick={handleUnfollow}>Unfollow</button>
                )}
                <p>{followersCount} followers <br/> {followingCount} following</p>
              </div>
            </div>
          </div>
        )
      ) : (
        userProfile && (
          <div className="profile-pic-container">
            <img
              className="profile-pic"
              src={`http://localhost:8000${userProfile.profile_pic}`}
              alt="Profile Picture"
            />
            <div className="profile-details">
              <div className="name-field">
                <p>{userProfile.first_name} {userProfile.last_name}</p>
              </div>
              <div className="rating-container">
                <Rating
                  count={5}
                  value={5}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
              <div className="follow-button-container">
              <p>{followersCount} followers <br/> {followingCount} following</p>
              </div>
            </div>
            <button
              className="edit-profile-details-button"
              onClick={() => handleEditClick('edit_name_profile_pic')}
            >
              <FaEdit size={15} />
            </button>

            {isEditing && editComponent && (
              <EditNameProfilePic
                renderComponent={editComponent}
                onEditCancel={() => setIsEditing(false)}
                updateUserProfile={updateUserProfile}
              />
            )}
          </div>
        )
      )}
    </>
  );
};

export default ProfilePicture;
