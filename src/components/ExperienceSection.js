import React, { useState } from 'react';
import { auth, firestore } from './firebase';
import './ExperienceSection.css';

function ExperienceSection({ experienceDetails, setExperienceDetails }) {
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddExperienceDetail = () => {
    const newExperienceDetails = [
      ...experienceDetails,
      {
        title,
        organization,
        startDate,
        endDate,
        description
      }
    ];
    setExperienceDetails(newExperienceDetails);
    setShowAddExperience(false);
    updateExperienceDetailsInFirestore(newExperienceDetails);
  };

  const handleEditExperienceDetail = (index) => {
    setEditIndex(index);
    const detail = experienceDetails[index];
    setTitle(detail.title);
    setOrganization(detail.organization);
    setStartDate(detail.startDate);
    setEndDate(detail.endDate);
    setDescription(detail.description);
    setShowAddExperience(true);
  };

  const handleUpdateExperienceDetail = () => {
    const updatedDetails = [...experienceDetails];
    updatedDetails[editIndex] = {
      title,
      organization,
      startDate,
      endDate,
      description
    };
    setExperienceDetails(updatedDetails);
    setEditIndex(-1);
    setShowAddExperience(false);
    updateExperienceDetailsInFirestore(updatedDetails);
  };

  const handleDeleteExperienceDetail = (index) => {
    const updatedDetails = [...experienceDetails];
    updatedDetails.splice(index, 1);
    setExperienceDetails(updatedDetails);
    updateExperienceDetailsInFirestore(updatedDetails);
  };

  const updateExperienceDetailsInFirestore = async (details) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        experienceDetails: details
      });
    }
  };

  return (
    <div className="experience-section">
      <h2>Experience</h2>
      {!showAddExperience && (
        <button className="add-button" onClick={() => setShowAddExperience(true)}>Add Experience</button>
      )}
      {showAddExperience && (
        <div className="experience-form">
          <input className="input-field" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <input className="input-field" type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Organization" />
          <input className="date-field" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
          <input className="date-field" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
          <textarea className="textarea-field" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
          {editIndex !== -1 ? (
            <button className="update-button" onClick={handleUpdateExperienceDetail}>Update</button>
          ) : (
            <button className="add-button" onClick={handleAddExperienceDetail}>Add</button>
          )}
        </div>
      )}
      <div className="experience-details">
        <h3>Experience Details</h3>
        <ul>
          <li className="header">
            <p>Title</p>
            <p>Organization</p>
            <p>Start Date</p>
            <p>End Date</p>
            <p>Description</p>
            <p>Actions</p>
          </li>
          {experienceDetails.map((experience, index) => (
            <li key={index}>
              <p>{experience.title}</p>
              <p>{experience.organization}</p>
              <p>{experience.startDate}</p>
              <p>{experience.endDate}</p>
              <p>{experience.description}</p>
              <button className="edit-button" onClick={() => handleEditExperienceDetail(index)}>Edit</button>
              <button className="delete-button" onClick={() => handleDeleteExperienceDetail(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExperienceSection;
