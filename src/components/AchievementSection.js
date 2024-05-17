import React, { useState } from 'react';
import { auth, firestore } from './firebase';
import '../style/AchievementSection.css';

function AchievementSection({ achievementDetails, setAchievementDetails, onDeleteAchievementDetail }) {
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [achievementName, setAchievementName] = useState('');
  const [achievementOrganization, setAchievementOrganization] = useState('');
  const [achievementDate, setAchievementDate] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  // const [setAchievementDetails] = useState([]);

  const handleAddAchievementDetail = () => {
    const newAchievementDetails = [
      ...achievementDetails,
      {
        achievementName,
        achievementOrganization,
        achievementDate,
        achievementDescription
      }
    ];
    setAchievementDetails(newAchievementDetails);
    setAchievementName('');
    setAchievementOrganization('');
    setAchievementDate('');
    setAchievementDescription('');
    setShowAddAchievement(false);
    updateAchievementDetailsInFirestore(newAchievementDetails);
  };

  const handleEditAchievementDetail = (index) => {
    setEditIndex(index);
    const detail = achievementDetails[index];
    setAchievementName(detail.achievementName);
    setAchievementOrganization(detail.achievementOrganization);
    setAchievementDate(detail.achievementDate);
    setAchievementDescription(detail.achievementDescription);
    setShowAddAchievement(true);
  };

  const handleUpdateAchievementDetail = () => {
    const updatedDetails = [...achievementDetails];
    updatedDetails[editIndex] = {
      achievementName,
      achievementOrganization,
      achievementDate,
      achievementDescription
    };
    setAchievementDetails(updatedDetails);
    setEditIndex(-1);
    setShowAddAchievement(false);
    updateAchievementDetailsInFirestore(updatedDetails);
  };

  const handleDeleteAchievementDetail = (index) => {
    const updatedDetails = [...achievementDetails];
    updatedDetails.splice(index, 1);
    setAchievementDetails(updatedDetails);
    updateAchievementDetailsInFirestore(updatedDetails);
  };

  const updateAchievementDetailsInFirestore = async (details) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        achievementDetails: details
      });
    }
  };

  return (
    <div className='achievement-section'>
      <h2>Achievements</h2>
      {!showAddAchievement && (
          <button onClick={() => setShowAddAchievement(true)}>Add Achievement</button>
        )}
        {showAddAchievement && (
          <div>
            <input type="text" value={achievementName} onChange={(e) => setAchievementName(e.target.value)} placeholder="Achievement Name" />
            <input type="text" value={achievementOrganization} onChange={(e) => setAchievementOrganization(e.target.value)} placeholder="Organization" />
            <input type="date" value={achievementDate} onChange={(e) => setAchievementDate(e.target.value)} placeholder="Date" />
            <textarea value={achievementDescription} onChange={(e) => setAchievementDescription(e.target.value)} placeholder="Description"></textarea>
            {editIndex !== -1 ? (
              <button className="small-button" onClick={handleUpdateAchievementDetail}>Update</button>
            ) : (
              <button className="small-button" onClick={handleAddAchievementDetail}>Add</button>
            )}
          </div>
        )}
        <div className="achievement-details">
          <h3>Achievement Details</h3>
          <ul>
            <li className="header">
              <p>Achievement Name</p>
              <p>Organization</p>
              <p>Date</p>
              <p>Description</p>
              <p>Actions</p>
            </li>
            {achievementDetails.map((achievement, index) => (
              <li key={index}>
                <p>{achievement.achievementName}</p>
                <p>{achievement.achievementOrganization}</p>
                <p>{achievement.achievementDate}</p>
                <p>{achievement.achievementDescription}</p>
                <button className="small-button" onClick={() => handleEditAchievementDetail(index)}>Edit</button>
                <button className="small-button" onClick={() => handleDeleteAchievementDetail(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

export default AchievementSection;
