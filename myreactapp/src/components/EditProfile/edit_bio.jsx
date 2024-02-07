import React from 'react';

const EditBio = ({ formData, handleInputChange }) => {
  return (
    <>
      <h2 className="edit-profile-header">Edit Bio</h2>
      <label className="edit-profile-label">Bio</label>
      <textarea
        className="edit-bio-input"
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
      />
    </>
  );
};

export default EditBio;
