import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = 'http://localhost:8000/api/';

const CommentBox = ({post_id,fetchUserData}) => {
  const [commentText, setCommentText] = useState('');
  const token = localStorage.getItem('token');

  const handleCommentSubmit = async () => {
    try {
      // Send the comment to the server
      const response=await axios.post(
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
      <button onClick={handleCommentSubmit}>Post</button>
    </div>
  );
};

export default CommentBox;