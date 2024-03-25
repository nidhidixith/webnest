import React, { useState, useEffect } from 'react';
import './likesmodal.css';

const LikesModal = ({ likes, closeLikesModal, handleProfileButtonClick }) => {
    return (
        <div className="likes-modal">
            <div className="likes-modal-content">
                <button className="likes-modal-close-button" onClick={closeLikesModal}>
                    &times;
                </button>

                <p><b>Likes</b></p>
                {likes.map((like, index) => (
                    <div className="each-like" key={index}>
                        {/* Render each like */}
                        <img src={`http://localhost:8000${like.user_details.profile_pic}`} alt="Profile Picture"/>
                            <div className="likes-details">
                                <button className="user-profile-button" onClick={() => handleProfileButtonClick(like.user_details.user_id)}>
                                {like.user_details.first_name} {like.user_details.last_name}</button>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LikesModal;
