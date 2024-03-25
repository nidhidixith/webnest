import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './commentmodal.css';
import calculateElapsedTime from '../../../calculateElapsedTime.jsx';
const API_BASE_URL = 'http://localhost:8000/api/';

const CommentModal = ({ comments, closeCommentModal, handleProfileButtonClick }) => {
    return (
        <div className="comment-modal">
            <div className="comment-modal-content">
                <button className="comment-modal-close-button" onClick={closeCommentModal}>
                    &times;
                </button>

                <p><b>Comments</b></p>
                {/* Render comments here */}
                {comments.map((comment, index) => (
                    <div className="each-comment" key={index}>
                        {/* Render each comment */}
                        <img src={`http://localhost:8000${comment.user_details.profile_pic}`} alt="Profile Picture"/>
                        <div className="outer-comment-container">
                            <div className="comment-details">
                                <button className="user-profile-button" onClick={() => handleProfileButtonClick(comment.user_details.user_id)}>
                                <p>{comment.user_details.first_name} {comment.user_details.last_name}</p></button>
                                <p className="comment-text">{comment.text}</p>
                            </div>
                            <p className="comment-created-at">{comment.elapsed_time || calculateElapsedTime(comment.created_at)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentModal;
