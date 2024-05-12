import React, { useState } from 'react';
import { auth, firestore } from './firebase';

function ExtraCurricularSection({ onUpdateExtraCurricularDetails, onDeleteExtraCurricularDetail }) {
  const [extraCurricularDetails, setExtraCurricularDetails] = useState([]);
  const [showAddExtraCurricular, setShowAddExtraCurricular] = useState(false);
  const [activity, setActivity] = useState('');
  const [position, setPosition] = useState('');
  const [startDateExtraCurricular, setStartDateExtraCurricular] = useState('');
  const [endDateExtraCurricular, setEndDateExtraCurricular] = useState('');
  const [descriptionExtraCurricular, setDescriptionExtraCurricular] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddExtraCurricularDetail = () => { // Function to handle adding extra-curricular detail
    const newExtraCurricularDetails = [
      ...extraCurricularDetails,
      {
        activity,
        position,
        startDate: startDateExtraCurricular,
        endDate: endDateExtraCurricular,
        description: descriptionExtraCurricular
      }
    ];
    setExtraCurricularDetails(newExtraCurricularDetails);
    setActivity('');
    setPosition('');
    setStartDateExtraCurricular('');
    setEndDateExtraCurricular('');
    setDescriptionExtraCurricular('');
    setShowAddExtraCurricular(false);
    updateExtraCurricularDetailsInFirestore(newExtraCurricularDetails);
  };

  const handleEditExtraCurricularDetail = (index) => { // Function to handle editing extra-curricular detail
    setEditIndex(index);
    const detail = extraCurricularDetails[index];
    setActivity(detail.activity);
    setPosition(detail.position);
    setStartDateExtraCurricular(detail.startDate);
    setEndDateExtraCurricular(detail.endDate);
    setDescriptionExtraCurricular(detail.description);
    setShowAddExtraCurricular(true);
  };

  const handleUpdateExtraCurricularDetail = () => { // Function to handle updating extra-curricular detail
    const updatedDetails = [...extraCurricularDetails];
    updatedDetails[editIndex] = {
      activity,
      position,
      startDate: startDateExtraCurricular,
      endDate: endDateExtraCurricular,
      description: descriptionExtraCurricular
    };
    setExtraCurricularDetails(updatedDetails);
    setEditIndex(-1);
    setShowAddExtraCurricular(false);
    updateExtraCurricularDetailsInFirestore(updatedDetails);
  };

  const handleDeleteExtraCurricularDetail = (index) => { // Function to handle deleting extra-curricular detail
    const updatedDetails = [...extraCurricularDetails];
    updatedDetails.splice(index, 1);
    setExtraCurricularDetails(updatedDetails);
    updateExtraCurricularDetailsInFirestore(updatedDetails);
  };

  const updateExtraCurricularDetailsInFirestore = async (details) => { // Function to update extra-curricular details in Firestore
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        extraCurricularDetails: details
      });
    }
  };

  return (
    <div>
      <h2>Extra-curricular</h2>
      {!showAddExtraCurricular && (
        <button onClick={() => setShowAddExtraCurricular(true)}>Add Extra-curricular</button>
      )}
      {showAddExtraCurricular && (
        <div>
          <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="Activity" />
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
          <input type="date" value={startDateExtraCurricular} onChange={(e) => setStartDateExtraCurricular(e.target.value)} placeholder="Start Date" />
          <input type="date" value={endDateExtraCurricular} onChange={(e) => setEndDateExtraCurricular(e.target.value)} placeholder="End Date" />
          <textarea value={descriptionExtraCurricular} onChange={(e) => setDescriptionExtraCurricular(e.target.value)} placeholder="Description"></textarea>
          {editIndex !== -1 ? (
            <button className="small-button" onClick={handleUpdateExtraCurricularDetail}>Update</button>
          ) : (
            <button className="small-button" onClick={handleAddExtraCurricularDetail}>Add</button>
          )}
        </div>
      )}
      <div className="extra-curricular-details">
        <h3>Extra-curricular Details</h3>
        <ul>
          <li className="header">
            <p>Activity</p>
            <p>Position</p>
            <p>Start Date</p>
            <p>End Date</p>
            <p>Description</p>
            <p>Actions</p>
          </li>
          {extraCurricularDetails.map((extraCurricular, index) => (
            <li key={index}>
              <p>{extraCurricular.activity}</p>
              <p>{extraCurricular.position}</p>
              <p>{extraCurricular.startDate}</p>
              <p>{extraCurricular.endDate}</p>
              <p>{extraCurricular.description}</p>
              <button className="small-button" onClick={() => handleEditExtraCurricularDetail(index)}>Edit</button>
              <button className="small-button" onClick={() => handleDeleteExtraCurricularDetail(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExtraCurricularSection;
