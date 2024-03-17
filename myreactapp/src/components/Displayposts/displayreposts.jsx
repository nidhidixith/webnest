import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
import './displayreposts.css';
import Navbar from '../Navbar/navbar.jsx';
import CommentBox from '../DisplayPosts/commentbox.jsx';
import CommentModal from '../DisplayPosts/commentmodal.jsx';
import LikesModal from '../DisplayPosts/likesmodal.jsx';
import RepostModal from '../DisplayPosts/repostmodal.jsx';
import calculateElapsedTime from '../../calculateElapsedTime.jsx';
const API_BASE_URL = 'http://localhost:8000/api/';

const DisplayReposts = ({isOtherUsersPosts=false, isOtherUsersProfile=false, otherUserId=null}) => {
  const [userData, setUserData] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostIdForRepost, setSelectedPostIdForRepost] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const closeLikesModal = () => {
    setShowLikesModal(false);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  const closeRepostModal = () => {
    setShowRepostModal(false);
  };

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
      setShowLikesModal(false);
      setShowCommentModal(false);
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
      fetchUserData();
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
      fetchUserData();
    };

    const handleCommentButtonClick = (post_id) => {
      // Toggle the comment box for the selected post
      setShowCommentBox((prevPostId) => (prevPostId === post_id ? null : post_id));
    };

    const handleGetComments = async(post_id) => {
      const response = await axios.get(`${API_BASE_URL}posts/get-comments/${post_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      //console.log(response.data.comments);

      // Assuming each comment has a 'text' property
//         response.data.comments.forEach((comment, index) => {
// //           console.log(`Comment ${index + 1}: ${comment.text}`);
// //           console.log('User Details:', comment.user_details.first_name, comment.user_details.last_name); // Display user details if needed
//         });

        setComments(response.data.comments);
        setShowCommentModal(true);
    }

    const handleGetLikes = async(post_id) => {
      const response = await axios.get(`${API_BASE_URL}posts/get-likes/${post_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

        response.data.likes.forEach((like, index) => {
          console.log(`Like ${index + 1}:`);
          console.log('User Details:', like.user_details.first_name, like.user_details.last_name); // Display user details if needed
        });

        setLikes(response.data.likes);
        setShowLikesModal(true);
    }


  const handleRepostButtonClick = (postId) => {
    setShowRepostModal(true);
    setSelectedPostIdForRepost(postId);
  }

    const fetchUserData = async () => {
      let response;
//       if (isOtherUsersPosts) {
//         response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//       } else if (isOtherUsersProfile) {
//         response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts-by-id/${otherUserId}/`);
//       } else {
//         response = await axios.get(`${API_BASE_URL}posts/get-user-posts/`, {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//       }

//       const postsData = response.data;

      // Fetch reposts separately
      const repostsResponse = await axios.get(`${API_BASE_URL}posts/get-reposts/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const repostsData = repostsResponse.data;
      console.log("Repost data",repostsData);

//       repostsData.forEach((repost,index)=>{
//           console.log('User Details:', repost.user_details.first_name, repost.user_details.last_name);
//           console.log(`Repost text ${index + 1}: ${repost.text}`)
//           console.log('Post Details:', repost.original_post_details.text, repost.original_post_details.media_file);
//           console.log('Original User Details:', repost.original_post_details.user_details.first_name, repost.original_post_details.user_details.last_name);
//       });

      const updatedUserData = await Promise.all(
        repostsData.map(async (post) => {
          try {
            const likeCheckResponse = await axios.get(`${API_BASE_URL}posts/check-liked/${post.id}/`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            const commentsResponse = await axios.get(`${API_BASE_URL}posts/get-comments/${post.id}/`, {
              headers: {
                Authorization: `Token ${token}`,
              },
            });
            return {
              ...post,
              liked: likeCheckResponse.data.is_liked,
              likeCount: likeCheckResponse.data.like_count,
              commentsCount: commentsResponse.data.comment_count,
            };
          } catch (error) {
            console.error('Error checking if liked:', error);
            return post;
          }
        })
      );

  setUserData(updatedUserData);
};


  useEffect(() => {
    // Reset state when navigating to a different user's profile
    setUserData([]);
    setShowCommentBox(null);
    setShowLikesModal(false);
    setShowCommentModal(false);
    setLikes([]);
    setComments([]);
    const fetchData = async () => {
      try {
        fetchUserData();
        // Update elapsed time every minute
        const intervalId = setInterval(updateElapsedTime, 60000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      } catch (error) {
        console.log(`Error fetching ${isOtherUsersPosts ? 'other users' : 'user'} posts:`, error);
      }
    };

    fetchData();
  }, [token, isOtherUsersPosts, isOtherUsersProfile, otherUserId]);

  return (
    <>
      <div className="user-post-container">
        {userData.map((post) => (
          <div key={post.id} className="user-post">
              <button className="user-post-close-button">&times;</button>
              <div className="user-post-top-outer-container">
              <div className="user-post-top-container">
                  <img src={`http://localhost:8000${post.user_details.profile_pic}`} alt="Profile Picture"/>
                  <div className="user-post-user-details">
                      <button className="user-profile-button" onClick={() => handleProfileButtonClick(post.user_details.user_id)}>
                      <p>{post.user_details.first_name} {post.user_details.last_name} </p></button> reposted this
                      <p>{post.elapsed_time || calculateElapsedTime(post.created_at)}</p>

                  </div>
              </div>
              <p className="repost-text">{post.text}</p>
              </div>

              <div className="user-post-bottom-container">

              <div className="user-repost-bottom-container">
                <div className="user-post-top-container">
                  <img src={`http://localhost:8000${post.original_post_details.user_details.profile_pic}`} alt="Profile Picture"/>
                  <div className="user-post-user-details">
                      <button className="user-profile-button" onClick={() => handleProfileButtonClick(post.original_post_details.user_details.user_id)}>
                      <p>{post.original_post_details.user_details.first_name} {post.original_post_details.user_details.last_name} </p></button>
                  </div>
                </div>

                <p>{post.original_post_details.text}</p>

                {post.original_post_details.media_file && (
                  <div className="user-post-media">
                    {post.original_post_details.media_file.endsWith('.mp4') ||
                    post.original_post_details.media_file.endsWith('.mov') ||
                    post.original_post_details.media_file.endsWith('.avi') ? (
                      <video controls width="300">
                        <source src={`http://localhost:8000${post.original_post_details.media_file}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={`http://localhost:8000${post.original_post_details.media_file}`} alt="User Media" width="300px" height="300px" />
                    )}
                  </div>
                )}
              </div>
                <div className="like-comments-display">
                  {post.likeCount && <button className="like-count-button" onClick={() => handleGetLikes(post.id)}>
                    <p className="like-count">{post.likeCount} likes</p>
                  </button>}
                  {post.commentsCount === 0 ? (
                    <p></p>
                  ) : (
                    <button className="comment-count-button" onClick={() => handleGetComments(post.id)}>
                      <p className="comments-count">{post.commentsCount} comments</p>
                    </button>
                  )}
                </div>


                <div className="user-post-button-container">
                   {!post.liked ? (
                      <button className="like-button-default" onClick={() => handlePostLikes(post.id)}>Like</button>
                    ) : (
                      <button className="like-button-liked" onClick={() => handlePostUnLikes(post.id)}>Like</button>
                    )}
                   <button onClick={() => handleCommentButtonClick(post.id)}>Comment</button>
                   <button>Share</button>
                   <button onClick={() => handleRepostButtonClick(post.id)}>Repost</button>
                </div>

                {showCommentBox === post.id && (
                  // Render the comment box for the selected post
                  <CommentBox post_id={post.id} fetchUserData={fetchUserData} />
                )}

              </div>
          </div>
        ))}
      </div>

      {showCommentModal && <CommentModal comments={comments} closeCommentModal={closeCommentModal} handleProfileButtonClick={handleProfileButtonClick}/>}
      {showLikesModal && <LikesModal likes={likes} closeLikesModal={closeLikesModal} handleProfileButtonClick={handleProfileButtonClick}/>}
      {showRepostModal && <RepostModal selectedPostIdForRepost={selectedPostIdForRepost} closeRepostModal={closeRepostModal} />}

    </>
  );
};

export default DisplayReposts;