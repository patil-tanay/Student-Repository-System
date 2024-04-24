// // StudentDashboard.js
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { firestore } from '../firebase';

// const StudentDashboard = ({ userId }) => {
//   const [education, setEducation] = useState(null);

//   useEffect(() => {
//     const fetchEducation = async () => {
//       try {
//         const doc = await firestore.collection('education').doc(userId).get();
//         if (doc.exists) {
//           setEducation(doc.data());
//         }
//       } catch (error) {
//         console.error('Error fetching education details:', error);
//       }
//     };
//     fetchEducation();
//   }, [userId]);

//   return (
//     <div>
//       <h2>Student Dashboard</h2>
//       {education ? (
//         <div>
//           <h3>Education Details</h3>
//           <p>College Name: {education.collegeName}</p>
//           <p>School Name: {education.schoolName}</p>
//           <p>Percentage: {education.percentage}</p>
//           <p>CGPA: {education.cgpa}</p>
//           <p>Passing Year: {education.passingYear}</p>
//           <Link to="/education">
//             <button>Edit Education Details</button>
//           </Link>
//         </div>
//       ) : (
//         <Link to="/education">
//           <button>Add Education Details</button>
//         </Link>
//       )}
//       {/* Other content of the StudentDashboard */}
//     </div>
//   );
// };

// export default StudentDashboard;



import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Academics from './Academics';
import Achievements from './Achievements';
import Extracurricular from './Extracurricular';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/dashboard/profile">Profile</Link></li>
          <li><Link to="/dashboard/academics">Academics</Link></li>
          <li><Link to="/dashboard/achievements">Achievements</Link></li>
          <li><Link to="/dashboard/extracurricular">Extracurricular</Link></li>
        </ul>
      </div>
      <div className="content">
        <Routes>
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/academics" element={<Academics />} />
          <Route path="/dashboard/achievements" element={<Achievements />} />
          <Route path="/dashboard/extracurricular" element={<Extracurricular />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
