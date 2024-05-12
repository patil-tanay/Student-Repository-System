// import React, { useEffect, useState } from 'react';
// import { firestore } from './firebase'; // Assuming 'firestore' is imported from firebase

// function FacultyDashboard() {
//   const [studentData, setStudentData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       const studentsRef = await firestore.collection('users').where('role', '==', 'student').get();
//       const studentsData = studentsRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setStudentData(studentsData);
//     };

//     fetchStudentData();
//   }, []);

//   return (
//     <div>
//       <h1>Faculty Dashboard</h1>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search by name or email"
//       />
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

// export default FacultyDashboard;



import React, { useEffect, useState } from 'react';
import { firestore } from '../components/firebase';
import * as XLSX from 'xlsx'; // Import xlsx library

function FacultyDashboard() {
  const [studentData, setStudentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentsRef = await firestore.collection('users').where('role', '==', 'student').get();
      const studentsData = studentsRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudentData(studentsData);
    };

    fetchStudentData();
  }, []);

  // Function to handle Excel export
  const handleExportToExcel = () => {
    const filteredData = studentData.filter((student) => {
      const name = student.name || '';
      const email = student.email || '';
      const selectedClass = student.selectedClass || '';
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
    // Save workbook to file
    XLSX.writeFile(workbook, 'filtered_data.xlsx');
  };

  return (
    <div>
      <h1>Faculty Dashboard</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name, email, or class"
      />
      <button onClick={handleExportToExcel}>Export to Excel</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Enrollment No</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {studentData
            .filter((student) => {
              const name = student.name || '';
              const email = student.email || '';
              const selectedClass = student.selectedClass || '';
              return (
                name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                selectedClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
                email.toLowerCase().includes(searchQuery.toLowerCase())
              );
            })
            .map((student, index) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.role}</td>
                <td>{student.enrollmentNumber}</td>
                <td>{student.selectedClass}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacultyDashboard;