import React from 'react';

const EditExternalLinks = ({ formData, handleInputChange }) => {
  return (
    <>
      <h2 className="edit-profile-header">Edit your links</h2>
      <label className="edit-profile-label">Instagram</label>
      <input
        className="edit-profile-input"
        type="text"
        name="instagram"
        value={formData.instagram}
        onChange={handleInputChange}
      />

      <label className="edit-profile-label">Facebook</label>
      <input
        className="edit-profile-input"
        type="text"
        name="facebook"
        value={formData.facebook}
        onChange={handleInputChange}
      />

      <label className="edit-profile-label">Portfolio Link</label>
      <input
        className="edit-profile-input"
        type="text"
        name="portfolioLink"
        value={formData.portfolioLink}
        onChange={handleInputChange}
      />

      <label className="edit-profile-label">External Website Link</label>
      <input
        className="edit-profile-input"
        type="text"
        name="externalLink"
        value={formData.externalLink}
        onChange={handleInputChange}
      />

    </>
  );
};

export default EditExternalLinks;
