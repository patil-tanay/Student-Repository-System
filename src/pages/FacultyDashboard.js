// // import React, { useEffect, useState } from 'react';
// // import { firestore } from './firebase'; // Assuming 'firestore' is imported from firebase

// // function FacultyDashboard() {
// //   const [studentData, setStudentData] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     const fetchStudentData = async () => {
// //       const studentsRef = await firestore.collection('users').where('role', '==', 'student').get();
// //       const studentsData = studentsRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //       setStudentData(studentsData);
// //     };

// //     fetchStudentData();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Faculty Dashboard</h1>
// //       <input
// //         type="text"
// //         value={searchQuery}
// //         onChange={(e) => setSearchQuery(e.target.value)}
// //         placeholder="Search by name or email"
// //       />
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Enrollment No</th>
// //             <th>Class</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {studentData
// //             .filter((student) => {
// //               const name = student.name || '';
// //               const email = student.email || '';
// //               const selectedClass = student.selectedClass || '';
// //               return (
// //                 name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                 selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                 email.toLowerCase().includes(searchQuery.toLowerCase())
// //               );
// //             })
// //             .map((student, index) => (
// //               <tr key={student.id}>
// //                 <td>{student.name}</td>
// //                 <td>{student.email}</td>
// //                 <td>{student.role}</td>
// //                 <td>{student.enrollmentNumber}</td>
// //                 <td>{student.selectedClass}</td>
// //               </tr>
// //             ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default FacultyDashboard;



// // import React, { useEffect, useState } from 'react';
// // import { firestore } from '../components/firebase';
// // import * as XLSX from 'xlsx'; // Import xlsx library
// // import '../style/FacultyDashboard.css';

// // function FacultyDashboard() {
// //   const [studentData, setStudentData] = useState([]);
// //   const [searchQuery, setSearchQuery] = useState('');

// //   useEffect(() => {
// //     const fetchStudentData = async () => {
// //       const studentsRef = await firestore.collection('users').where('role', '==', 'student').get();
// //       const studentsData = studentsRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// //       setStudentData(studentsData);
// //     };

// //     fetchStudentData();
// //   }, []);

// //   // Function to handle Excel export
// //   const handleExportToExcel = () => {
// //     const filteredData = studentData.filter((student) => {
// //       const name = student.name || '';
// //       const email = student.email || '';
// //       const selectedClass = student.selectedClass || '';
// //       return (
// //         name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         email.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     });

// //     // Create a new workbook
// //     const workbook = XLSX.utils.book_new();
// //     // Convert data to worksheet
// //     const worksheet = XLSX.utils.json_to_sheet(filteredData);
// //     // Add worksheet to workbook
// //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
// //     // Save workbook to file
// //     XLSX.writeFile(workbook, 'filtered_data.xlsx');
// //   };

// //   return (
// //     <div>
// //       <h1>Faculty Dashboard</h1>
// //       <input
// //         type="text"
// //         value={searchQuery}
// //         onChange={(e) => setSearchQuery(e.target.value)}
// //         placeholder="Search by name, email, or class"
// //       />
// //       <button onClick={handleExportToExcel}>Export to Excel</button>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Enrollment No</th>
// //             <th>Class</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {studentData
// //             .filter((student) => {
// //               const name = student.name || '';
// //               const email = student.email || '';
// //               const selectedClass = student.selectedClass || '';
// //               return (
// //                 name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                 selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                 email.toLowerCase().includes(searchQuery.toLowerCase())
// //               );
// //             })
// //             .map((student, index) => (
// //               <tr key={student.id}>
// //                 <td>{student.name}</td>
// //                 <td>{student.email}</td>
// //                 <td>{student.role}</td>
// //                 <td>{student.enrollmentNumber}</td>
// //                 <td>{student.selectedClass}</td>
// //               </tr>
// //             ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default FacultyDashboard;


// // Import necessary components
// import React, { useEffect, useState } from 'react';
// import { firestore } from '../components/firebase'; // Assuming 'firestore' is imported from firebase
// import * as XLSX from 'xlsx'; // Import xlsx library
// import '../style/FacultyDashboard.css'; // Import CSS styles

// // Function FacultyDashboard
// function FacultyDashboard() {
//   // Initialize state variables
//   const [studentData, setStudentData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   // UseEffect hook to fetch student data from Firestore
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       const studentsRef = await firestore.collection('users').where('role', '==', 'student').get();
//       const studentsData = studentsRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setStudentData(studentsData);
//     };

//     fetchStudentData();
//   }, []);

//   // Function to handle Excel export
//   const handleExportToExcel = () => {
//     const filteredData = studentData.filter((student) => {
//       const name = student.name || '';
//       const email = student.email || '';
//       const selectedClass = student.selectedClass || '';
//       return (
//         name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         email.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     });

//     // Create a new workbook
//     const workbook = XLSX.utils.book_new();
//     // Convert data to worksheet
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     // Add worksheet to workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
//     // Save workbook to file
//     XLSX.writeFile(workbook, 'filtered_data.xlsx');
//   };

//   // Return JSX for the Faculty Dashboard
//   return (
//     <div>
//       <h1>Faculty Dashboard</h1>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search by name, email, or class"
//       />
//       <button onClick={handleExportToExcel}>Export to Excel</button>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Enrollment No</th>
//             <th>Class</th>
//           </tr>
//         </thead>
//         <tbody>
//           {studentData
//             .filter((student) => {
//               const name = student.name || '';
//               const email = student.email || '';
//               const selectedClass = student.selectedClass || '';
//               return (
//                 name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 email.toLowerCase().includes(searchQuery.toLowerCase())
//               );
//             })
//             .map((student, index) => (
//               <tr key={student.id}>
//                 <td>{student.name}</td>
//                 <td>{student.email}</td>
//                 <td>{student.role}</td>
//                 <td>{student.enrollmentNumber}</td>
//                 <td>{student.selectedClass}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// // Export the FacultyDashboard component
// export default FacultyDashboard;













// import React, { useState, useEffect } from 'react';
// import { firestore } from '../components/firebase';
// import * as XLSX from 'xlsx';

// function FacultyDashboard() {
//   const [studentsData, setStudentsData] = useState([]);
//   const [percentageFilter, setPercentageFilter] = useState('');

//   useEffect(() => {
//     const fetchStudentsData = async () => {
//       const studentsCollection = await firestore.collection('users').get();
//       setStudentsData(studentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//     };

//     fetchStudentsData();
//   }, []);

//   const filteredStudentsData = studentsData.filter(student => 
//     student.educationDetails?.standard12thDetails?.percentage >= percentageFilter
//   );

//   const downloadExcel = () => {
//     const dataToDownload = filteredStudentsData.map(student => ({
//       name: student.name,
//       email: student.email,
//       '12th Percentage': student.educationDetails?.standard12thDetails?.percentage,
//     }));

//     const ws = XLSX.utils.json_to_sheet(dataToDownload);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Students");
//     XLSX.writeFile(wb, "students.xlsx");
//   };

//   return (
//     <div className="faculty-dashboard">
//       <h2>Faculty Dashboard</h2>
//       <div>
//         Filter by 12th Percentage: 
//         <input 
//           type="number" 
//           value={percentageFilter} 
//           onChange={e => setPercentageFilter(e.target.value)} 
//           placeholder="Enter percentage"
//         />
//         <button onClick={downloadExcel}>Download</button>
//       </div>
//       <table>


import React, { useState, useEffect } from 'react';
import { firestore } from '../components/firebase';
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';
import * as XLSX from 'xlsx';

function FacultyDashboard() {
  const [studentsData, setStudentsData] = useState([]);
  const [percentageFilter12th, setPercentageFilter12th] = useState('');
  const [percentageFilter10th, setPercentageFilter10th] = useState('');
  const [cgpaFilter, setCgpaFilter] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStudentsData = async () => {
      const studentsCollection = await firestore.collection('users').get();
      setStudentsData(studentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchStudentsData();
  }, []);

  const filteredStudentsData = studentsData.filter(student => 
    student.educationDetails?.standard12thDetails?.percentage >= percentageFilter12th &&
    student.educationDetails?.standard10thDetails?.percentage >= percentageFilter10th &&
    student.educationDetails?.graduationDetails?.cgpa >= cgpaFilter
  );

    const downloadExcel = () => {
    const dataToDownload = filteredStudentsData.map(student => ({
      name: student.name,
      email: student.email,
      '12th Percentage': student.educationDetails?.standard12thDetails?.percentage,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToDownload);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };
  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="faculty-dashboard">
      <h2>Faculty Dashboard</h2>
      <button className="" onClick={handleLogout}>Logout</button>
      <div>
        Filter by 12th Percentage: 
        <input 
          type="number" 
          value={percentageFilter12th} 
          onChange={e => setPercentageFilter12th(e.target.value)} 
          placeholder="Enter 12th percentage"
        />
        Filter by 10th Percentage: 
        <input 
          type="number" 
          value={percentageFilter10th} 
          onChange={e => setPercentageFilter10th(e.target.value)} 
          placeholder="Enter 10th percentage"
        />
        Filter by CGPA: 
        <input 
          type="number" 
          value={cgpaFilter} 
          onChange={e => setCgpaFilter(e.target.value)} 
          placeholder="Enter CGPA"
        />
        <button onClick={downloadExcel}>Download</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Year of Graduation</th>
            <th>Program</th>
            <th>Specialization</th>
            <th>CGPA</th>
            <th>Current Semester</th>
            <th>School Name (12th)</th>
            <th>Board (12th)</th>
            <th>Percentage (12th)</th>
            <th>Year of Completion (12th)</th>
            <th>School Name (10th)</th>
            <th>Board (10th)</th>
            <th>Percentage (10th)</th>
            <th>Year of Completion (10th)</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudentsData.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.educationDetails?.graduationDetails?.yearOfGraduation}</td>
              <td>{student.educationDetails?.graduationDetails?.program}</td>
              <td>{student.educationDetails?.graduationDetails?.specialization}</td>
              <td>{student.educationDetails?.graduationDetails?.cgpa}</td>
              <td>{student.educationDetails?.graduationDetails?.currentSemester}</td>
              <td>{student.educationDetails?.standard12thDetails?.schoolName}</td>
              <td>{student.educationDetails?.standard12thDetails?.board}</td>
              <td>{student.educationDetails?.standard12thDetails?.percentage}</td>
              <td>{student.educationDetails?.standard12thDetails?.yearOfCompletion}</td>
              <td>{student.educationDetails?.standard10thDetails?.schoolName}</td>
              <td>{student.educationDetails?.standard10thDetails?.board}</td>
              <td>{student.educationDetails?.standard10thDetails?.percentage}</td>
              <td>{student.educationDetails?.standard10thDetails?.yearOfCompletion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacultyDashboard;