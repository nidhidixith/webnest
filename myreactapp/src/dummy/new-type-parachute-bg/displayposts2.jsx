import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
import './displayposts.css';
import Navbar from '../Navbar/navbar.jsx';
const API_BASE_URL = 'http://localhost:8000/api/';

const calculateElapsedTime = (created_at) => {
  const now = new Date();
  const createdAtDate = new Date(created_at);
  const secondsDifference = Math.floor((now - createdAtDate) / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} seconds ago`;
  } else if (secondsDifference < 3600) {
    const minutes = Math.floor(secondsDifference / 60);
    return `${minutes} minutes ago`;
  } else if (secondsDifference < 86400) {
    const hours = Math.floor(secondsDifference / 3600);
    return `${hours} hours ago`;
  } else {
    return createdAtDate.toLocaleDateString();
  }
  };

const PostComponent = ({isOtherUsersPosts=false, isOtherUsersProfile=false, otherUserId=null}) => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const updateElapsedTime = () => {
    setUserData((prevUserData) =>
      prevUserData.map((post) => ({
        ...post,
        elapsed_time: calculateElapsedTime(post.created_at),
      }))
    );
  };

  const handleProfileButtonClick = (userId) => {
    // Navigate to DisplayProfile with the post.id
      console.log('UserID from PostComponent',userId);
      navigate(`/displayprofile/${userId}`);
    };

   const handlePostLikes = async (post_id) => {
      // Update 'liked' state for the specific post
      setUserData((prevUserData) =>
        prevUserData.map((post) =>
          post.id === post_id ? { ...post, liked: true } : post
        )
      );
      try {
        const response = await axios.post(
          `${API_BASE_URL}posts/like/${post_id}/`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log(response.data.detail);
      } catch (error) {
        console.error('Error handling likes', error);
      }
      fetchUpdatedUserData();
    };

    const handlePostUnLikes = async (post_id) => {
      // Update 'liked' state for the specific post
      setUserData((prevUserData) =>
        prevUserData.map((post) =>
          post.id === post_id ? { ...post, liked: false } : post
        )
      );
      try {
        const response = await axios.delete(`${API_BASE_URL}posts/like/${post_id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data.detail);
      } catch (error) {
        console.error('Error handling Unlikes', error);
      }
      fetchUpdatedUserData();
    };

    const fetchUpdatedUserData = async () => {
           let response;
            if (isOtherUsersPosts) {
              response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts/`, {
                headers: {
                  Authorization: `Token ${token}`,
                },
              });
            }
            else if (isOtherUsersProfile) {
              response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts-by-id/${otherUserId}/`)
            }
            else {
              response = await axios.get(`${API_BASE_URL}posts/get-user-posts/`, {
                headers: {
                  Authorization: `Token ${token}`,
                },
              });
            }
            const updatedUserData = await Promise.all(
                response.data.map(async (post) => {
                  try {
                    const likeCheckResponse = await axios.get(`${API_BASE_URL}posts/check-liked/${post.id}/`, {
                      headers: {
                        Authorization: `Token ${token}`,
                      },
                    });
                    return {
                      ...post,
                      liked: likeCheckResponse.data.is_liked,
                      likeCount: likeCheckResponse.data.like_count,
                    };
                  } catch (error) {
                    console.error('Error checking if liked:', error);
                    return post;
                  }
                })
              )
              setUserData(updatedUserData);
      }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
//         let response;
//         if (isOtherUsersPosts) {
//           response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts/`, {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           });
//         }
//         else if (isOtherUsersProfile) {
//           response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts-by-id/${otherUserId}/`)
//         }
//         else {
//           response = await axios.get(`${API_BASE_URL}posts/get-user-posts/`, {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           });
//         }

//       const updatedUserData = await Promise.all(
//         response.data.map(async (post) => {
//           try {
//             const likeCheckResponse = await axios.get(`${API_BASE_URL}posts/check-liked/${post.id}/`, {
//               headers: {
//                 Authorization: `Token ${token}`,
//               },
//             });
//             return {
//               ...post,
//               liked: likeCheckResponse.data.is_liked,
//               likeCount: likeCheckResponse.data.like_count,
//             };
//           } catch (error) {
//             console.error('Error checking if liked:', error);
//             return post;
//           }
//         })
//       );
//      setUserData(updatedUserData);
        fetchUpdatedUserData();
        // Update elapsed time every minute
        const intervalId = setInterval(updateElapsedTime, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      } catch (error) {
        console.log(`Error fetching ${isOtherUsersPosts ? 'other users' : 'user'} posts:`, error);
      }
    };

    fetchUserData();
  }, [token, isOtherUsersPosts]);

  return (
    <>
      <div className="user-post-container">
        {userData.map((post) => (
          <div key={post.id} className="user-post">
              <button className="user-post-close-button">&times;</button>
              <div className="user-post-top-container">
                  <img src={`http://localhost:8000${post.user_details.profile_pic}`} alt="Profile Picture"/>
                  <div className="user-post-user-details">
                      <button className="user-profile-button" onClick={() => handleProfileButtonClick(post.user_details.user_id)}>
                      <p>{post.user_details.first_name} {post.user_details.last_name}</p></button>
                      <p>{post.elapsed_time || calculateElapsedTime(post.created_at)}</p>
                  </div>

              </div>
              <div className="user-post-bottom-container">
                <p>{post.text}</p>

                {post.media_file && (
                  <div className="user-post-media">
                    {post.media_file.endsWith('.mp4') ||
                    post.media_file.endsWith('.mov') ||
                    post.media_file.endsWith('.avi') ? (
                      <video controls width="300">
                        <source src={`http://localhost:8000${post.media_file}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={`http://localhost:8000${post.media_file}`} alt="User Media" width="300px" height="300px" />
                    )}
                  </div>
                )}
                {post.likeCount && <p>{post.likeCount} likes</p>}
                <div className="user-post-button-container">

                   {!post.liked ? (
                      <button className="like-button-default" onClick={() => handlePostLikes(post.id)}>Like</button>
                    ) : (
                      <button className="like-button-liked" onClick={() => handlePostUnLikes(post.id)}>Like</button>
                    )}

                   <button>Comment</button>
                   <button>Share</button>
                   <button>Repost</button>
                </div>
              </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostComponent;