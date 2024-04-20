// // FacultyDashboard.js
// import React, { useState, useEffect } from 'react';
// import { firestore } from '../firebase';

// const FacultyDashboard = () => {
//   const [studentDetails, setStudentDetails] = useState([]);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const snapshot = await firestore.collection('studentDetails').get();
//         const fetchedDetails = snapshot.docs.map(doc => doc.data());
//         setStudentDetails(fetchedDetails);
//       } catch (error) {
//         console.error('Error fetching student details:', error);
//       }
//     };
//     fetchStudentDetails();
//   }, []);

//   return (
//     <div>
//       <h2>Faculty Dashboard</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Gender</th>
//             {/* Add more table headers for additional details */}
//           </tr>
//         </thead>
//         <tbody>
//           {studentDetails.map((student, index) => (
//             <tr key={index}>
//               <td>{student.name}</td>
//               <td>{student.email}</td>
//               <td>{student.gender}</td>
//               {/* Add more table cells for additional details */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FacultyDashboard;



// FacultyDashboard.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const FacultyDashboard = () => {
  const [studentDetails, setStudentDetails] = useState([]);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const snapshot = await firestore.collection('students').get();
        const fetchedDetails = snapshot.docs.map(doc => doc.data());
        setStudentDetails(fetchedDetails);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };
    fetchStudentDetails();
  }, []);

  return (
    <div>
      <h2>Faculty Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone</th>
            <th>City</th>
            <th>Date of Birth</th>
            {/* Add more table headers for additional details */}
          </tr>
        </thead>
        <tbody>
          {studentDetails.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td>{student.address}</td>
              <td>{student.phone}</td>
              <td>{student.city}</td>
              <td>{student.dob}</td>
              {/* Add more table cells for additional details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyDashboard;
