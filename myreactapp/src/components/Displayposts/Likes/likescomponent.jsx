import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';
const token = localStorage.getItem('token');

export const handlePostLikes = async (post_id, fetchUserData, setUserData) => {
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

export const handlePostUnLikes = async (post_id, fetchUserData, setUserData) => {
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

export const handleGetLikes = async (post_id, setShowLikesModal, setLikes) => {
    try {
        const response = await axios.get(`${API_BASE_URL}posts/get-likes/${post_id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        setLikes(response.data.likes);
        setShowLikesModal(true);
    } catch (error) {
        console.error('Error getting likes', error);
    }
};
