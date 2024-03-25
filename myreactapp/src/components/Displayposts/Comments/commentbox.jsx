import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './commentbox.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/';

const CommentBox = ({ post_id, post, fetchUserData }) => {
  const [commentText, setCommentText] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Enable or disable the button based on whether commentText is empty
    setIsButtonDisabled(commentText.trim() === '');
  }, [commentText]);

  const handleCommentSubmit = async () => {

    try {
      // Send the comment to the server
      const response = await axios.post(
        `${API_BASE_URL}posts/add-comment/${post_id}/`,
        { text: commentText },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
      fetchUserData();
      setCommentText('');
      alert('Comment posted');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="comment-box">
      <textarea
        placeholder="Type your comment here..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        onClick={handleCommentSubmit}
        disabled={isButtonDisabled}
      >
        Post
      </button>
    </div>
  );
};

export default CommentBox;
