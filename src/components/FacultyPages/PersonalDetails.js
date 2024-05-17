// Import necessary components
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; // Assuming 'firestore' is imported from firebase
import * as XLSX from 'xlsx'; // Import xlsx library
// import './style/FacultyDashboard.css'; // Import CSS styles

// Function FacultyDashboard
function FacultyDashboard() {
  // Initialize state variables
  const [studentData, setStudentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  // UseEffect hook to fetch student data from Firestore
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

  // Return JSX for the Faculty Dashboard
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
            <th className="table-cell">Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Enrollment No</th>
            <th className="table-cell">Class</th>
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
                <td className="table-cell">{student.name}</td>
                <td className="table-cell">{student.email}</td>
                <td className="table-cell">{student.enrollmentNumber}</td>
                <td className="table-cell">{student.selectedClass}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

// Export the FacultyDashboard component
export default FacultyDashboard;