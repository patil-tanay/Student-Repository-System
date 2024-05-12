// import React, { useState } from 'react';
// import { auth, firestore } from './firebase';
// import './EducationSection.css';

// function EducationSection({ educationDetails, setEducationDetails }) {
//   const [showAddEducation, setShowAddEducation] = useState(false);
//   const [schoolType, setSchoolType] = useState('');
//   const [schoolName, setSchoolName] = useState('');
//   const [yearOfPassing, setYearOfPassing] = useState('');
//   const [percentageOrCGPA, setPercentageOrCGPA] = useState('');
//   const [editIndex, setEditIndex] = useState(-1);

//   const handleAddEducationDetail = () => {
//     const newEducationDetails = [
//       ...educationDetails,
//       {
//         schoolType,
//         schoolName,
//         yearOfPassing,
//         percentageOrCGPA
//       }
//     ];
//     setEducationDetails(newEducationDetails);
//     setSchoolType('');
//     setSchoolName('');
//     setYearOfPassing('');
//     setPercentageOrCGPA('');
//     setShowAddEducation(false);
//     updateEducationDetailsInFirestore(newEducationDetails);
//   };

//   const handleEditEducationDetail = (index) => {
//     setEditIndex(index);
//     const detail = educationDetails[index];
//     setSchoolType(detail.schoolType);
//     setSchoolName(detail.schoolName);
//     setYearOfPassing(detail.yearOfPassing);
//     setPercentageOrCGPA(detail.percentageOrCGPA);
//     setShowAddEducation(true);
//   };

//   const handleUpdateEducationDetail = () => {
//     const updatedDetails = [...educationDetails];
//     updatedDetails[editIndex] = {
//       schoolType,
//       schoolName,
//       yearOfPassing,
//       percentageOrCGPA
//     };
//     setEducationDetails(updatedDetails);
//     setEditIndex(-1);
//     setShowAddEducation(false);
//     updateEducationDetailsInFirestore(updatedDetails);
//   };

//   const handleDeleteEducationDetail = (index) => {
//     const updatedDetails = [...educationDetails];
//     updatedDetails.splice(index, 1);
//     setEducationDetails(updatedDetails);
//     updateEducationDetailsInFirestore(updatedDetails);
//   };

//   const updateEducationDetailsInFirestore = async (details) => {
//     const user = auth.currentUser;
//     if (user) {
//       await firestore.collection('users').doc(user.uid).update({
//         educationDetails: details
//       });
//     }
//   };

//   return (
//     <div className="education-section">
//       <h2>Education</h2>
//       <button onClick={() => setShowAddEducation(!showAddEducation)}>
//         {showAddEducation ? "Close Form" : "Add Education"}
//       </button>

//       {showAddEducation && (
//         <div className="education-form">
//           <select className="select-field" value={schoolType} onChange={(e) => setSchoolType(e.target.value)}>
//             <option value="">Select School Type</option>
//             <option value="10th">10th School</option>
//             <option value="12th">12th School</option>
//             <option value="college">College</option>
//           </select>
//           <input className="input-edu-field" type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="School/College Name" />
//           <input className="input-edu-field" type="text" value={yearOfPassing} onChange={(e) => setYearOfPassing(e.target.value)} placeholder="Year of Passing" />
//           <input className="input-edu-field" type="text" value={percentageOrCGPA} onChange={(e) => setPercentageOrCGPA(e.target.value)} placeholder="Percentage/CGPA" />
//           {editIndex !== -1 ?
//             <button className="update-button" onClick={handleUpdateEducationDetail}>Update</button> :
//             <button className="add-button" onClick={handleAddEducationDetail}>Add</button>
//           }
//         </div>
//       )}

//       <div className="education-details">
//         <h3>Education Details</h3>
//         <ul>
//           <li className="header">
//             <p>School Type</p>
//             <p>School/College Name</p>
//             <p>Year of Passing</p>
//             <p>Percentage/CGPA</p>
//             <p>Actions</p>
//           </li>
//           {educationDetails.map((education, index) => (
//             <li key={index}>
//               <p>{education.schoolType}</p>
//               <p>{education.schoolName}</p>
//               <p>{education.yearOfPassing}</p>
//               <p>{education.percentageOrCGPA}</p>
//               <button className="edit-button" onClick={() => handleEditEducationDetail(index)}>Edit</button>
//               <button className="delete-button" onClick={() => handleDeleteEducationDetail(index)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default EducationSection;





// import React, { useState, useEffect } from 'react';
// import { auth, firestore } from './firebase';
// import './EducationSection.css';

// function EducationSection({ educationDetails, setEducationDetails }) {
//   const [graduationDetails, setGraduationDetails] = useState({
//     yearOfGraduation: '',
//     program: '',
//     specialization: '',
//     cgpa: '',
//     currentSemester: ''
//   });
//   const [standard12thDetails, setStandard12thDetails] = useState({
//     yearOfCompletion: '',
//     board: '',
//     percentage: '',
//     schoolName: ''
//   });
//   const [standard10thDetails, setStandard10thDetails] = useState({
//     yearOfCompletion: '',
//     board: '',
//     percentage: '',
//     schoolName: ''
//   });

//   useEffect(() => {
//     // Initialize state with existing education details
//     if (educationDetails) {
//       setGraduationDetails(educationDetails.graduationDetails || {});
//       setStandard12thDetails(educationDetails.standard12thDetails || {});
//       setStandard10thDetails(educationDetails.standard10thDetails || {});
//     }
//   }, [educationDetails]);

//   const handleSaveGraduationDetails = () => {
//     const newEducationDetails = {
//       ...educationDetails,
//       graduationDetails
//     };
//     setEducationDetails(newEducationDetails);
//     updateEducationDetailsInFirestore(newEducationDetails);
//   };

//   const handleSaveStandard12thDetails = () => {
//     const newEducationDetails = {
//       ...educationDetails,
//       standard12thDetails
//     };
//     setEducationDetails(newEducationDetails);
//     updateEducationDetailsInFirestore(newEducationDetails);
//   };

//   const handleSaveStandard10thDetails = () => {
//     const newEducationDetails = {
//       ...educationDetails,
//       standard10thDetails
//     };
//     setEducationDetails(newEducationDetails);
//     updateEducationDetailsInFirestore(newEducationDetails);
//   };

//   const updateEducationDetailsInFirestore = async (details) => {
//     const user = auth.currentUser;
//     if (user) {
//       await firestore.collection('users').doc(user.uid).update({
//         educationDetails: details
//       });
//     }
//   };

//   return (
//     <div className="education-section">
//       <h2>Education</h2>

//       <div className="education-form">
//         {/* Graduation Details */}
//         <h3>Graduation Degree</h3> 
//         <input className="input-edu-field" type="text" value={graduationDetails.yearOfGraduation} onChange={(e) => setGraduationDetails({ ...graduationDetails, yearOfGraduation: e.target.value })} placeholder="Year of Graduation" />
//         <input className="input-edu-field" type="text" value={graduationDetails.program} onChange={(e) => setGraduationDetails({ ...graduationDetails, program: e.target.value })} placeholder="Program" />
//         <input className="input-edu-field" type="text" value={graduationDetails.specialization} onChange={(e) => setGraduationDetails({ ...graduationDetails, specialization: e.target.value })} placeholder="Specialization" />
//         <input className="input-edu-field" type="text" value={graduationDetails.cgpa} onChange={(e) => setGraduationDetails({ ...graduationDetails, cgpa: e.target.value })} placeholder="CGPA" />
//         <input className="input-edu-field" type="text" value={graduationDetails.currentSemester} onChange={(e) => setGraduationDetails({ ...graduationDetails, currentSemester: e.target.value })} placeholder="Current Semester" />
//         <button className="add-button" onClick={handleSaveGraduationDetails}>Save</button>

//         {/* Standard 12th Details */}
//         <h3>Standard 12th</h3>
//         <input className="input-edu-field" type="text" value={standard12thDetails.yearOfCompletion} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, yearOfCompletion: e.target.value })} placeholder="Year of Completion" />
//         <input className="input-edu-field" type="text" value={standard12thDetails.board} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, board: e.target.value })} placeholder="Board" />
//         <input className="input-edu-field" type="text" value={standard12thDetails.percentage} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, percentage: e.target.value })} placeholder="Percentage" />
//         <input className="input-edu-field" type="text" value={standard12thDetails.schoolName} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, schoolName: e.target.value })} placeholder="School Name" />
//         <button className="add-button" onClick={handleSaveStandard12thDetails}>Save</button>

//         {/* Standard 10th Details */}
//         <h3>Standard 10th</h3>
//         <input className="input-edu-field" type="text" value={standard10thDetails.yearOfCompletion} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, yearOfCompletion: e.target.value })} placeholder="Year of Completion" />
//         <input className="input-edu-field" type="text" value={standard10thDetails.board} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, board: e.target.value })} placeholder="Board" />
//         <input className="input-edu-field" type="text" value={standard10thDetails.percentage} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, percentage: e.target.value })} placeholder="Percentage" />
//         <input className="input-edu-field" type="text" value={standard10thDetails.schoolName} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, schoolName: e.target.value })} placeholder="School Name" />
//         <button className="add-button" onClick={handleSaveStandard10thDetails}>Save</button>
//       </div>
//     </div>
//   );
// }

// export default EducationSection;



import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';

import './EducationSection.css';

function EducationSection({ educationDetails, setEducationDetails }) {
  const [graduationDetails, setGraduationDetails] = useState({
    yearOfGraduation: '',
    program: '',
    specialization: '',
    cgpa: '',
    currentSemester: ''
  });
  const [standard12thDetails, setStandard12thDetails] = useState({
    yearOfCompletion: '',
    board: '',
    percentage: '',
    schoolName: ''
  });
  const [standard10thDetails, setStandard10thDetails] = useState({
    yearOfCompletion: '',
    board: '',
    percentage: '',
    schoolName: ''
  });

  useEffect(() => {
    // Initialize state with existing education details
    if (educationDetails) {
      setGraduationDetails(educationDetails.graduationDetails || {});
      setStandard12thDetails(educationDetails.standard12thDetails || {});
      setStandard10thDetails(educationDetails.standard10thDetails || {});
    }
  }, [educationDetails]);

  const handleSaveGraduationDetails = () => {
    const newEducationDetails = {
      ...educationDetails,
      graduationDetails
    };
    setEducationDetails(newEducationDetails);
    updateEducationDetailsInFirestore(newEducationDetails);
  };

  const handleSaveStandard12thDetails = () => {
    const newEducationDetails = {
      ...educationDetails,
      standard12thDetails
    };
    setEducationDetails(newEducationDetails);
    updateEducationDetailsInFirestore(newEducationDetails);
  };

  const handleSaveStandard10thDetails = () => {
    const newEducationDetails = {
      ...educationDetails,
      standard10thDetails
    };
    setEducationDetails(newEducationDetails);
    updateEducationDetailsInFirestore(newEducationDetails);
  };

  const updateEducationDetailsInFirestore = async (details) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        educationDetails: details
      });
    }
  };

  // Dropdown options
  const semesters = ['Select Sem',1, 2, 3, 4, 5, 6, 7, 8];
  const programs = ['', 'B.Tech'];
  const specializations = ['', 'CSE'];
  const boards = ['Select Board', 'CBSE', 'ICSE', 'State Board'];
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="education-section">
      <h2>Education</h2>
      <div>
        <h3>Graduation Degree</h3>
      </div>
      <div className="education-form">
        {/* Graduation Details */}
        <div className="form-group">
          <label>Year of Graduation</label> <br />
          <input className="input-edu-field" type="text" value={graduationDetails.yearOfGraduation} onChange={(e) => setGraduationDetails({ ...graduationDetails, yearOfGraduation: e.target.value })} placeholder="Year of Graduation" />
        </div>
        <div className="form-group">
          <label>Program</label> <br />
          <select className="input-edu-field" value={graduationDetails.program} onChange={(e) => setGraduationDetails({ ...graduationDetails, program: e.target.value })}>
            {programs.map((program, index) => (
              <option key={index} value={program}>{program}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Specialization</label> <br />
          <select className="input-edu-field" value={graduationDetails.specialization} onChange={(e) => setGraduationDetails({ ...graduationDetails, specialization: e.target.value })}>
            {specializations.map((specialization, index) => (
              <option key={index} value={specialization}>{specialization}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>CGPA</label> <br />
          <input className="input-edu-field" type="text" value={graduationDetails.cgpa} onChange={(e) => setGraduationDetails({ ...graduationDetails, cgpa: e.target.value })} placeholder="CGPA" />
        </div>
        <div className="form-group">
          <label>Current Semester</label> <br />
          <select className="input-edu-field" value={graduationDetails.currentSemester} onChange={(e) => setGraduationDetails({ ...graduationDetails, currentSemester: e.target.value })}>
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>{semester}</option>
            ))}
          </select>
        </div>
      </div>
      <button className="add-button" onClick={handleSaveGraduationDetails}>Save</button>

      {/* Standard 12th Details */}
      <div>
        <h3>Standard 12th</h3>
      </div>
      <div className="education-form">
        <div className="form-group">
          <label>School Name</label>
          <input className="input-edu-field" type="text" value={standard12thDetails.schoolName} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, schoolName: e.target.value })} placeholder="School Name" />
        </div>
        <div className="form-group">
        <label>Board</label> <br />
          <select className="input-edu-field" value={standard12thDetails.board} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, board: e.target.value })}>
            {boards.map((board, index) => (
              <option key={index} value={board}>{board}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Percentage</label>
          <input className="input-edu-field" type="text" value={standard12thDetails.percentage} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, percentage: e.target.value })} placeholder="Percentage" />
        </div>
        <div className="form-group">
          <label>Year of Completion</label>
          <input className="input-edu-field" type="text" value={standard12thDetails.yearOfCompletion} onChange={(e) => setStandard12thDetails({ ...standard12thDetails, yearOfCompletion: e.target.value })} placeholder="Year of Completion" />
        </div>
      </div>
      <button className="add-button" onClick={handleSaveStandard12thDetails}>Save</button>

      {/* Standard 10th Details */}
      <div>
        <h3>Standard 10th</h3>
      </div>
      <div className="education-form">
        <div className="form-group">
          <label>School Name</label>
          <input className="input-edu-field" type="text" value={standard10thDetails.schoolName} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, schoolName: e.target.value })} placeholder="School Name" />
        </div>
        <div className="form-group">
        <label>Board</label> <br />
          <select className="input-edu-field" value={standard10thDetails.board} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, board: e.target.value })}>
            {boards.map((board, index) => (
              <option key={index} value={board}>{board}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Percentage</label>
          <input className="input-edu-field" type="text" value={standard10thDetails.percentage} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, percentage: e.target.value })} placeholder="Percentage" />
        </div>
        <div className="form-group">
        <label>Year of Completion</label>
          <input className="input-edu-field" type="text" value={standard10thDetails.yearOfCompletion} onChange={(e) => setStandard10thDetails({ ...standard10thDetails, yearOfCompletion: e.target.value })} placeholder="Year of Completion" />
        </div>
      </div>
      <button className="add-button" onClick={handleSaveStandard10thDetails}>Save</button>
    </div>
  );
}

export default EducationSection;
