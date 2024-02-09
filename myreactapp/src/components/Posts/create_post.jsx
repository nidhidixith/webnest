import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './create_post.css';

const API_BASE_URL = 'http://localhost:8000/api/';

const CreatePost = ({ closeModal }) => {
  const [text, setText] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const isPostButtonDisabled = !text && !mediaFile;

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const [previewUrl, setPreviewUrl] = useState('');

  const handleMediaFileChange = (event) => {
    const file = event.target.files[0];
    setMediaFile(file);

    if (file) {
      // Create a URL for the preview
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const removeAttachment = () => {
    setMediaFile(null);
    setPreviewUrl('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text && !mediaFile) {
      setError('Please enter text or upload a media file.');
      return;
    }

    // Create a FormData object to send both text and media file to the server
    const formData = new FormData();
    formData.append('text', text);
    // Check if media_file is not null before appending to FormData
    if (mediaFile !== null) {
      formData.append('media_file', mediaFile);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}posts/create/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Post successful');
      closeModal();
      // navigate('/success');
    } catch (error) {
      console.error('Error during post:', error.response.data.error);
      setError(error.response.data.error || 'Unsupported file type');
    }
  };

  return (
    <div className="post-modal">
      <div className="post-modal-content">
        <button className="post-modal-close-button" onClick={closeModal}>
          &times;
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>Create Post</p>
        <textarea name="text" value={text} onChange={handleTextChange} placeholder="Your text here"></textarea>
        <div className="post-modal-preview">
          {mediaFile && (
            <>
              <div className="preview-container">
                {mediaFile.type.includes('image') && (
                  <img src={previewUrl} alt="Preview" className="preview-image" />
                )}
                {mediaFile.type.includes('video') && (
                  <video controls className="preview-video">
                    <source src={previewUrl} type={mediaFile.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                <button className="remove-button" onClick={removeAttachment}>
                  &times;
                </button>
              </div>
            </>
          )}
        </div>
        <div className="post-modal-attach-buttons">
          <span>Attach to your post</span>
          <label className="custom-file-upload">
            <img src={`http://localhost:8000/media/photo-icon3.png`} alt="Media" />
            <input type="file" id="file-upload" name="media" accept="image/*, video/*" onChange={handleMediaFileChange} />
          </label>
        </div>
        <div className="post-modal-post-button-container">
          <button
            className={`post-modal-post-button ${isPostButtonDisabled ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={isPostButtonDisabled}
          >Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
