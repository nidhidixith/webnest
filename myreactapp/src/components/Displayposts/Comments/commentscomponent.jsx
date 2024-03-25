import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';
const token = localStorage.getItem('token');

export const handleCommentButtonClick = async (post_id, setShowCommentBox) => {
   setShowCommentBox((prevPostId) => (prevPostId === post_id ? null : post_id));
};

export const handleGetComments = async (post_id, setShowCommentModal, setComments) => {
    const response = await axios.get(`${API_BASE_URL}posts/get-comments/${post_id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setComments(response.data.comments);
      setShowCommentModal(true);
};
