import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseLayout from '../BaseLayout/baselayout';
import './displayposts.css'; // Import your CSS file

const API_BASE_URL = 'http://localhost:8000/api/';

const DisplayPosts = () => {
    const [userPost, setUserPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}posts/get-user-posts/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserPost(response.data);
            } catch (error) {
                console.error('Error fetching user post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, []);

    return (
        <>
            <BaseLayout />
            <div className="profile-container">
                {loading && <p>Loading Posts...</p>}
                {userPost && (
                    <div>
                        <h1 className="post-header">User Posts</h1>
                        <div className="post-field">
                            <p>Text: {userPost.text}</p>
                        </div>
                        <div className="post-field">
                            <p>Media:</p>
                            {userPost.media_file && (
                                <img
                                    className="media_file"
                                    src={`http://localhost:8000${userPost.media_file}`}
                                    alt="Media"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DisplayPosts;

