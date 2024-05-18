// export default MarksheetSection;
import React, { useState } from 'react';
import { auth, firestore, storage } from './firebase'; // Import Firebase modules
import '../style/MarksheetSection.css';

function MarksheetSection({ marksheetDetails, setMarksheetDetails }) {
  const [showAddMarksheet, setShowAddMarksheet] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [sgpa, setSgpa] = useState('');
  const [marksheetFile, setMarksheetFile] = useState(null);

  const handleAddMarksheet = async () => {
    // Upload file to Firebase Storage
    const storageRef = storage.ref(`marksheets/${marksheetFile.name}`);
    await storageRef.put(marksheetFile);

    // Get download URL for the uploaded file
    const downloadURL = await storageRef.getDownloadURL();

    // Add marksheet details to Firestore
    const newMarksheetDetails = [
      ...marksheetDetails,
      {
        semester: selectedSemester,
        sgpa,
        marksheetURL: downloadURL // Store download URL instead of file object
      }
    ];
    setMarksheetDetails(newMarksheetDetails);
    setSelectedSemester('');
    setSgpa('');
    setMarksheetFile(null);
    setShowAddMarksheet(false);
    updateMarksheetDetailsInFirestore(newMarksheetDetails);
  };

  const handleDeleteMarksheet = async (index) => {
    // Delete file from Firebase Storage if it's stored
    const marksheet = marksheetDetails[index];
    if (marksheet.marksheetURL) {
      const storageRef = storage.refFromURL(marksheet.marksheetURL);
      await storageRef.delete();
    }

    // Remove marksheet details from Firestore
    const updatedDetails = [...marksheetDetails];
    updatedDetails.splice(index, 1);
    setMarksheetDetails(updatedDetails);
    updateMarksheetDetailsInFirestore(updatedDetails);
  };

  const updateMarksheetDetailsInFirestore = async (details) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        marksheetDetails: details
      });
    }
  };

  return (
    <div className="marksheets-section">
      <h2>Marksheets</h2>
      <button onClick={() => setShowAddMarksheet(!showAddMarksheet)}>
        {showAddMarksheet ? "Close Form" : "Add Marksheet"}
      </button>

      {showAddMarksheet && (
        <div className="marksheets-form">
          <input type="text" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} placeholder="Semester" />
          <input type="text" value={sgpa} onChange={(e) => setSgpa(e.target.value)} placeholder="SGPA" />
          <input type="file" onChange={(e) => setMarksheetFile(e.target.files[0])} />
          <button className="add-button" onClick={handleAddMarksheet}>Add</button>
        </div>
      )}

      <div className="marksheets-details">
        <h3>Marksheet Details</h3>
        <table className="marksheets-table">
          <thead>
            <tr>
              <th>Semester</th>
              <th>SGPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {marksheetDetails.map((marksheet, index) => (
              <tr key={index}>
                <td>{marksheet.semester}</td>
                <td>{marksheet.sgpa}</td>
                <td>
                  <a className="view-button" href={marksheet.marksheetURL} target="_blank" rel="noopener noreferrer">View</a>
                  <button className="delete-button" onClick={() => handleDeleteMarksheet(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarksheetSection;
