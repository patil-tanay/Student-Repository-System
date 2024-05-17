import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import * as XLSX from 'xlsx';
// import '../style/EducationDashboard.css';
import './EducationDetails.css';
// F:/AI/Minor-2/src/style/EducationDetails.css
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
      <table className="table-responsive">
        <thead>
          <tr>
            <th className="table-cell">Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Year of Graduation</th>
            <th className="table-cell">Program</th>
            <th className="table-cell">Specialization</th>
            <th className="table-cell">CGPA</th>
            <th className="table-cell">Current Semester</th>
            <th className="table-cell">Board (12th)</th>
            <th className="table-cell">Percentage (12th)</th>
            <th className="table-cell">Year of Completion (12th)</th>
            <th className="table-cell">Board (10th)</th>
            <th className="table-cell">Percentage (10th)</th>
            <th className="table-cell">Year of Completion (10th)</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudentsData.map(student => (
            <tr key={student.id}>
              <td className="table-cell">{student.name}</td>
              <td className="table-cell">{student.email}</td>
              <td className="table-cell">{student.educationDetails?.graduationDetails?.yearOfGraduation}</td>
              <td className="table-cell">{student.educationDetails?.graduationDetails?.program}</td>
              <td className="table-cell">{student.educationDetails?.graduationDetails?.specialization}</td>
              <td className="table-cell">{student.educationDetails?.graduationDetails?.cgpa}</td>
              <td className="table-cell">{student.educationDetails?.graduationDetails?.currentSemester}</td>
              <td className="table-cell">{student.educationDetails?.standard12thDetails?.board}</td>
              <td className="table-cell">{student.educationDetails?.standard12thDetails?.percentage}</td>
              <td className="table-cell">{student.educationDetails?.standard12thDetails?.yearOfCompletion}</td>
              <td className="table-cell">{student.educationDetails?.standard10thDetails?.board}</td>
              <td className="table-cell">{student.educationDetails?.standard10thDetails?.percentage}</td>
              <td className="table-cell">{student.educationDetails?.standard10thDetails?.yearOfCompletion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacultyDashboard;