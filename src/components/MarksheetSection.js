// import React, { useState } from 'react';
// import { auth, firestore } from './firebase';
// import './MarksheetSection.css';

// function MarksheetSection({ marksheetDetails, setMarksheetDetails }) {
//   const [showAddMarksheet, setShowAddMarksheet] = useState(false);
//   const [selectedSemester, setSelectedSemester] = useState('');
//   const [sgpa, setSgpa] = useState('');
//   const [marksheetFile, setMarksheetFile] = useState(null);

//   const handleAddMarksheet = () => {
//     const newMarksheetDetails = [
//       ...marksheetDetails,
//       {
//         semester: selectedSemester,
//         sgpa,
//         marksheetFile
//       }
//     ];
//     setMarksheetDetails(newMarksheetDetails);
//     setSelectedSemester('');
//     setSgpa('');
//     setMarksheetFile(null);
//     setShowAddMarksheet(false);
//     updateMarksheetDetailsInFirestore(newMarksheetDetails);
//   };

//   const handleDeleteMarksheet = (index) => {
//     const updatedDetails = [...marksheetDetails];
//     updatedDetails.splice(index, 1);
//     setMarksheetDetails(updatedDetails);
//     updateMarksheetDetailsInFirestore(updatedDetails);
//   };

//   const updateMarksheetDetailsInFirestore = async (details) => {
//     const user = auth.currentUser;
//     if (user) {
//       await firestore.collection('users').doc(user.uid).update({
//         marksheetDetails: details
//       });
//     }
//   };

//   return (
//     <div className="marksheet-section">
//       <h2>Marksheets</h2>
//       <button onClick={() => setShowAddMarksheet(!showAddMarksheet)}>
//         {showAddMarksheet ? "Close Form" : "Add Marksheet"}
//       </button>

//       {showAddMarksheet && (
//         <div className="marksheet-form">
//           <select className="select-field" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
//             <option value="">Select Semester</option>
//             <option value="1">Semester 1</option>
//             <option value="2">Semester 2</option>
//             {/* Add options for other semesters */}
//           </select>
//           <input className="input-field" type="text" value={sgpa} onChange={(e) => setSgpa(e.target.value)} placeholder="SGPA" />
//           <input className="file-field" type="file" onChange={(e) => setMarksheetFile(e.target.files[0])} />
//           <button className="add-button" onClick={handleAddMarksheet}>Add</button>
//         </div>
//       )}

//       <div className="marksheet-details">
//         <h3>Marksheet Details</h3>
//         <ul>
//           <li className="header">
//             <p>Semester</p>
//             <p>SGPA</p>
//             <p>Actions</p>
//           </li>
//           {marksheetDetails.map((marksheet, index) => (
//             <li key={index}>
//               <p>{`Semester ${marksheet.semester}`}</p>
//               <p>{marksheet.sgpa}</p>
//               <button className="view-button" onClick={() => console.log("View marksheet")}>View</button>
//               <button className="delete-button" onClick={() => handleDeleteMarksheet(index)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default MarksheetSection;
import React, { useState } from 'react';
import { auth, firestore, storage } from './firebase'; // Import Firebase modules
import './MarksheetSection.css';

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
