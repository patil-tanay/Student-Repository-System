// EducationForm.js
import React, { useState } from 'react';
import { firestore } from '../firebase';

const EducationForm = ({ userId }) => {
  const [education, setEducation] = useState({
    collegeName: '',
    schoolName: '',
    percentage: '',
    cgpa: '',
    passingYear: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection('education').doc(userId).set(education);
      console.log('Education details added successfully!');
    } catch (error) {
      console.error('Error adding education details:', error);
    }
  };

  return (
    <div>
      <h2>Add Education Details</h2>
      <form onSubmit={handleSubmit}>
        <label>College Name:</label>
        <input type="text" name="collegeName" value={education.collegeName} onChange={handleChange} />
        <label>School Name:</label>
        <input type="text" name="schoolName" value={education.schoolName} onChange={handleChange} />
        <label>Percentage:</label>
        <input type="text" name="percentage" value={education.percentage} onChange={handleChange} />
        <label>CGPA:</label>
        <input type="text" name="cgpa" value={education.cgpa} onChange={handleChange} />
        <label>Passing Year:</label>
        <input type="text" name="passingYear" value={education.passingYear} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EducationForm;
