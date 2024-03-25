import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
import './displayposts.css';
import Navbar from '../Navbar/navbar.jsx';
import CommentBox from '../DisplayPosts/commentbox.jsx';
import CommentModal from '../DisplayPosts/commentmodal.jsx';
import LikesModal from '../DisplayPosts/likesmodal.jsx';
import RepostModal from '../DisplayPosts/repostmodal.jsx';
import calculateElapsedTime from '../../calculateElapsedTime.jsx';
const API_BASE_URL = 'http://localhost:8000/api/';

const PostComponent = ({isOtherUsersPosts=false, isOtherUsersProfile=false, otherUserId=null}) => {
  const [userData, setUserData] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostIdForRepost, setSelectedPostIdForRepost] = useState(null);
  const [showMore, setShowMore] = useState({});
  const [showMoreRepost, setShowMoreRepost] = useState({});
  const [hiddenPosts, setHiddenPosts] = useState({});

    const handleShowMoreLessButtonClick = (postId, isRepost = false) => {
        if (isRepost) {
            setShowMoreRepost(prevState => ({
                ...prevState,
                [postId]: !prevState[postId]
            }));
        } else {
            setShowMore(prevState => ({
                ...prevState,
                [postId]: !prevState[postId]
            }));
        }
    };

    const handleHidePost = postId => {
      setHiddenPosts(prevState => ({
        ...prevState,
        [postId]: !prevState[postId]
      }));
    };


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

   const handlePostLikes = async (post_id,content_type) => {
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
            params: {
                content_type: content_type
              }
          }
        );
        console.log(response.data.detail);
      } catch (error) {
        console.error('Error handling likes', error);
      }
      fetchUserData();
    };

    const handlePostUnLikes = async (post_id,content_type) => {
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
          params: {
                content_type: content_type
              }
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

    const handleGetComments = async(post_id, content_type) => {
      const response = await axios.get(`${API_BASE_URL}posts/get-comments/${post_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
                content_type: content_type
              }
      });
      //console.log(response.data.comments);

      // Assuming each comment has a 'text' property
        response.data.comments.forEach((comment, index) => {
//           console.log(`Comment ${index + 1}: ${comment.text}`);
//           console.log('User Details:', comment.user_details.first_name, comment.user_details.last_name); // Display user details if needed
        });

        setComments(response.data.comments);
        setShowCommentModal(true);
    }

    const handleGetLikes = async(post_id, content_type) => {
      //const content_type = post.original_post_details ? 'repost' : 'post';
      const response = await axios.get(`${API_BASE_URL}posts/get-likes/${post_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
                content_type: content_type
              }
      });

        response.data.likes.forEach((like, index) => {
          console.log(`Like ${index + 1}:`);
          console.log('User Details:', like.user_details.first_name, like.user_details.last_name); // Display user details if needed
        });

        setLikes(response.data.likes);
        setShowLikesModal(true);
    }

    const handleRepostButtonClick = (postId,original_post_id=null) => {
        console.log('Post ID:',postId);
        setShowRepostModal(true);
        if(original_post_id){
          setSelectedPostIdForRepost(original_post_id);
        }
        else{
          setSelectedPostIdForRepost(postId);
        }
    }

    const fetchUserPostComponentData = async () =>{
      let response;
      if (isOtherUsersPosts) {
        response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      } else if (isOtherUsersProfile) {
        response = await axios.get(`${API_BASE_URL}posts/get-other-users-posts-by-id/${otherUserId}/`);
      } else {
        response = await axios.get(`${API_BASE_URL}posts/get-user-posts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }

      const postComponentData = response.data;
      return postComponentData;
    }

    const fetchUserRePostComponentData = async () =>{
      let response;
      if (isOtherUsersPosts) {
        response = await axios.get(`${API_BASE_URL}posts/get-other-users-reposts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      } else if (isOtherUsersProfile) {
        response = await axios.get(`${API_BASE_URL}posts/get-other-users-reposts-by-id/${otherUserId}/`);
      } else {
        response = await axios.get(`${API_BASE_URL}posts/get-reposts/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
      const repostComponentData = response.data;
      return repostComponentData;
    }

    const fetchUserData = async () => {
    const postsData = await fetchUserPostComponentData();
    const repostsData = await fetchUserRePostComponentData();

    // Merge posts and reposts into a single array
    const allUserData = [...postsData, ...repostsData];

    // Sort merged array based on timestamp
    allUserData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Fetch additional data for each post/repost
    const updatedUserData = await Promise.all(
        allUserData.map(async (post) => {
            const content_type = post.original_post_details ? 'repost' : 'post';
            console.log('Content-type:', content_type);
            try {
                let likeCheckResponse, commentsResponse, repostResponse;

                if (content_type === 'repost') {
                    // Make only two API calls for reposts
                    likeCheckResponse = await axios.get(`${API_BASE_URL}posts/check-liked/${post.id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        params: {
                            content_type: content_type
                        }
                    });
                    commentsResponse = await axios.get(`${API_BASE_URL}posts/get-comments/${post.id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        params: {
                            content_type: content_type
                        }
                    });
                } else if (content_type === 'post') {
                    // Make all three API calls for posts
                    likeCheckResponse = await axios.get(`${API_BASE_URL}posts/check-liked/${post.id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        params: {
                            content_type: content_type
                        }
                    });
                    commentsResponse = await axios.get(`${API_BASE_URL}posts/get-comments/${post.id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        params: {
                            content_type: content_type
                        }
                    });
                    repostResponse = await axios.get(`${API_BASE_URL}posts/get-reposts-count/${post.id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                        params: {
                            content_type: content_type
                        }
                    });
                }

                // Return data based on content_type
                if (content_type === 'repost') {
                    return {
                        ...post,
                        liked: likeCheckResponse.data.is_liked,
                        likeCount: likeCheckResponse.data.like_count,
                        commentsCount: commentsResponse.data.comment_count,
                    };
                } else if (content_type === 'post') {
                    return {
                        ...post,
                        liked: likeCheckResponse.data.is_liked,
                        likeCount: likeCheckResponse.data.like_count,
                        commentsCount: commentsResponse.data.comment_count,
                        repostsCount: repostResponse.data.reposts_count,
                    };
                }
            } catch (error) {
                console.error('Error in promises:', error);
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
    setSelectedPostIdForRepost(null);
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
            {post.original_post_details ? (
            // Render repost
            hiddenPosts[post.id] ? (
              <div class="hide-post-container">
                    <p>Post hidden</p>
                    <button onClick={() => handleHidePost(post.id)}>Undo</button>
              </div>
            ):(
            <>
                <button className="user-post-close-button" onClick={() => handleHidePost(post.id)}>&times;</button>
                <div className="user-post-top-outer-container">
                <div className="user-post-top-container">
                    <img src={`http://localhost:8000${post.user_details.profile_pic}`} alt="Profile Picture"/>
                    <div className="user-post-user-details">
                        <button className="user-profile-button" onClick={() => handleProfileButtonClick(post.user_details.user_id)}>
                        <p>{post.user_details.first_name} {post.user_details.last_name} </p></button> reposted this
                        <p>{post.elapsed_time || calculateElapsedTime(post.created_at)}</p>
                    </div>
                </div>
                <div className="post-text-container">
                    {post.text.length>250 ? (
                        <p>{showMore[post.id] ? post.text : post.text.substring(0, 250)}
                        <button onClick={() => handleShowMoreLessButtonClick(post.id)}>
                            {showMore[post.id] ? "Show less" : "Show more"}
                        </button></p>
                    ):(
                        <p>{post.text}</p>
                    )}
                </div>
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

                <div className="post-text-container">
                    {post.original_post_details.text.length > 250 ? (
                     <p>{showMoreRepost[post.id] ? post.original_post_details.text : post.original_post_details.text.substring(0, 250)}
                        <button onClick={() => handleShowMoreLessButtonClick(post.id, true)}>
                            {showMoreRepost[post.id] ? "Show less" : "Show more"}
                        </button>
                     </p>
                    ) : (
                    <p>{post.original_post_details.text}</p>
                    )}
                </div>

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
                    {post.likeCount && (
                    <button className="like-count-button" onClick={() => handleGetLikes(post.id,'repost')}>
                        <p className="like-count">{post.likeCount} likes</p>
                    </button>
                    )}
                    {post.commentsCount !== 0 && (
                    <button className="comment-count-button" onClick={() => handleGetComments(post.id, 'repost')}>
                        <p className="comments-count">{post.commentsCount} comments</p>
                    </button>
                    )}
{/*                     {post.repostsCount !== 0 && ( */}
{/*                         <p className="reposts-count">{post.repostsCount} reposts</p> */}
{/*                     )} */}
                </div>

                <div className="user-post-button-container">
                    {!post.liked ? (
                        <button className="like-button-default" onClick={() => handlePostLikes(post.id,'repost')}>Like</button>
                    ) : (
                        <button className="like-button-liked" onClick={() => handlePostUnLikes(post.id,'repost')}>Like</button>
                    )}
                    <button onClick={() => handleCommentButtonClick(post.id,'repost')}>Comment</button>
                    <button>Share</button>
                    <button onClick={() => handleRepostButtonClick(post.id,post.original_post_details.id)}>Repost</button>
                </div>

                {showCommentBox === post.id && (
                // Render the comment box for the selected post
                <CommentBox post_id={post.id} post={post} fetchUserData={fetchUserData} />
                )}
                </div>
            </>
            )
            ) : (
            // Render post
            hiddenPosts[post.id] ? (
              <div class="hide-post-container">
                    <p>Post hidden</p>
                    <button onClick={() => handleHidePost(post.id)}>Undo</button>
              </div>
            ):(
            <>
            <button className="user-post-close-button" onClick={() => handleHidePost(post.id)}>&times;</button>
            <div className="user-post-top-container">
                <img src={`http://localhost:8000${post.user_details.profile_pic}`} alt="Profile Picture"/>
                <div className="user-post-user-details">
                <button className="user-profile-button" onClick={() => handleProfileButtonClick(post.user_details.user_id)}>
                <p>{post.user_details.first_name} {post.user_details.last_name}</p>
                </button>
                <p>{post.elapsed_time || calculateElapsedTime(post.created_at)}</p>
                </div>
            </div>

            <div className="user-post-bottom-container">
            <div className="post-text-container">
                {post.text.length>250 ? (
                    <p>{showMore[post.id] ? post.text : post.text.substring(0, 250)}
                    <button onClick={() => handleShowMoreLessButtonClick(post.id)}>
                        {showMore[post.id] ? "Show less" : "Show more"}
                    </button></p>
                    ):(
                    <p>{post.text}</p>
                )}
            </div>

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

            <div className="like-comments-display">
                {post.likeCount && (
                    <button className="like-count-button" onClick={() => handleGetLikes(post.id,'post')}>
                        <p className="like-count">{post.likeCount} likes</p>
                    </button>
                )}
                {post.commentsCount !== 0 && (
                    <button className="comment-count-button" onClick={() => handleGetComments(post.id,'post')}>
                        <p className="comments-count">{post.commentsCount} comments</p>
                    </button>
                )}
                {post.repostsCount !== 0 && (
                    <p className="reposts-count">{post.repostsCount} reposts</p>
                )}
            </div>

            <div className="user-post-button-container">
                {!post.liked ? (
                    <button className="like-button-default" onClick={() => handlePostLikes(post.id,'post')}>Like</button>
                ) : (
                    <button className="like-button-liked" onClick={() => handlePostUnLikes(post.id,'post')}>Like</button>
                )}
                <button onClick={() => handleCommentButtonClick(post.id,'post')}>Comment</button>
                <button>Share</button>
                <button onClick={() => handleRepostButtonClick(post.id)}>Repost</button>
            </div>
            {showCommentBox === post.id && (
            // Render the comment box for the selected post
            <CommentBox post_id={post.id} post={post} fetchUserData={fetchUserData}/>
            )}
            </div>
            </>
            )
            )}
            </div>
        ))}
    </div>
    {showCommentModal && <CommentModal comments={comments} closeCommentModal={closeCommentModal} handleProfileButtonClick={handleProfileButtonClick}/>}
    {showLikesModal && <LikesModal likes={likes} closeLikesModal={closeLikesModal} handleProfileButtonClick={handleProfileButtonClick}/>}
    {showRepostModal && <RepostModal selectedPostIdForRepost={selectedPostIdForRepost} closeRepostModal={closeRepostModal} />}

    </>
  );
};

export default PostComponent;