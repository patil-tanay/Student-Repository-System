// StudentDetailsForm.js
import React, { useState } from 'react';
import { firestore } from '../firebase';

const StudentDetailsForm = ({ userId }) => {
  const [details, setDetails] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection('studentDetails').doc(userId).set({
        userId,
        details
      });
      // Optionally display a success message or redirect
    } catch (error) {
      console.error('Error uploading details:', error);
    }
  };

  return (
    <div>
      <h2>Upload Your Details</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter your details..."
          rows={4}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentDetailsForm;
