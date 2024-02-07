import React from 'react';

const EditNameProfilePic = ({ formData, handleInputChange }) => {

  return (
    <>
      <h2 className="edit-profile-header">Edit Profile</h2>
      <label className="edit-profile-label">First Name</label>
      <input
        className="edit-profile-input"
        type="text"
        name="first_name"
        value={formData.first_name}
        onChange={handleInputChange}
      />

      <label className="edit-profile-label">Last Name</label>
      <input
        className="edit-profile-input"
        type="text"
        name="last_name"
        value={formData.last_name}
        onChange={handleInputChange}
      />

      <label className="edit-profile-label">Profile Picture</label>
      <input
        className="edit-profile-file-input"
        type="file"
        accept="image/*"
        name="profile_pic"
        onChange={handleInputChange}
      />
    </>
  );
};

export default EditNameProfilePic;
