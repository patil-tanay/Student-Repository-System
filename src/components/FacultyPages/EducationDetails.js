import React, { useState, useEffect } from 'react';
import { firestore } from '../components/firebase';
import * as XLSX from 'xlsx';

function FacultyDashboard() {
  const [studentsData, setStudentsData] = useState([]);
  const [percentageFilter12th, setPercentageFilter12th] = useState('');
  const [percentageFilter10th, setPercentageFilter10th] = useState('');
  const [cgpaFilter, setCgpaFilter] = useState('');

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

  return (
    <div className="faculty-dashboard">
      <h2>Faculty Dashboard</h2>
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