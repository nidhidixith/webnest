import React from 'react';

const EditInterests = ({ formData, handleInputChange }) => {
  return (
    <>
      <h2 className="edit-profile-header">Edit Interests</h2>
      <label className="edit-profile-label">Interests</label>
      {/*<input
        className="edit-profile-input"
        type="text"
        name="areas_of_interest"
        value={formData.areas_of_interest}
        onChange={handleInputChange}
      />*/}
    </>
  );
};

export default EditInterests;
