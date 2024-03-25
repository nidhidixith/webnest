import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api/';
import './repostmodal.css';

const RepostModal = ({ selectedPostIdForRepost, closeRepostModal }) => {
    const [repostText, setRepostText] = useState('');
    const token = localStorage.getItem('token');

    const handleRepost = async () => {
    if (!selectedPostIdForRepost) return; // Ensure a post is selected for repost
    try {
      const response = await axios.post(`${API_BASE_URL}posts/repost/`, {
        original_post: selectedPostIdForRepost,
        text: repostText
      }, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      alert("Repost successful");
      closeRepostModal(); // Close repost modal after successful repost
      console.log(response.data);
    } catch (error) {
      console.error('Error reposting:', error);
      // Add error handling logic here, like showing an error message
    }
  }

    return (
        <div className="repost-modal">
            <div className="repost-modal-content">
                <button className="repost-modal-close-button" onClick={closeRepostModal}>
                    &times;
                </button>

                <p><b>Repost</b></p>
                <textarea
                    value={repostText}
                    onChange={e => setRepostText(e.target.value)}
                    placeholder="Add your comment here..."
                />

                <button onClick={handleRepost}>Repost</button>

            </div>
        </div>
    );
};

export default RepostModal;
