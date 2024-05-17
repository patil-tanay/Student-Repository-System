import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import * as XLSX from 'xlsx';
import './certification.css'; // Ensure the CSS file is correctly linked

function CertificateDashboard() {
  const [studentsData, setStudentsData] = useState([]);
  const [certificateFilter, setCertificateFilter] = useState('');

  useEffect(() => {
    const fetchStudentsData = async () => {
      const studentsCollection = await firestore.collection('users').get();
      setStudentsData(studentsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchStudentsData();
  }, []);

  const filteredStudentsData = studentsData.filter(student =>
    student.certificateDetails?.some(certificate =>
      certificate.name.toLowerCase().includes(certificateFilter.toLowerCase())
    )
  );

  const downloadExcel = () => {
    const dataToDownload = filteredStudentsData.map(student => ({
      name: student.name,
      email: student.email,
      certificates: student.certificateDetails?.map(cert => cert.name).join(', '),
    }));

    const ws = XLSX.utils.json_to_sheet(dataToDownload);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Certificates");
    XLSX.writeFile(wb, "certificates.xlsx");
  };

  return (
    <div className="certificate-dashboard">
      <h2>Certificate Dashboard</h2>
      <div>
        Filter by Certificate Name: 
        <input 
          type="text" 
          value={certificateFilter} 
          onChange={e => setCertificateFilter(e.target.value)} 
          placeholder="Enter certificate name"
        />
        <button onClick={downloadExcel}>Download</button>
      </div>
      <table className="table-responsive">
      <thead>
  <tr>
    <th className="table-cell">Name</th>
    <th className="table-cell">Email</th>
    <th className="table-cell">Class</th>
    <th className="table-cell">Certificate Name</th>
    <th className="table-cell">Actions</th>
  </tr>
</thead>
<tbody>
  {filteredStudentsData.map(student => (
    student.certificateDetails.map((certificate, index) => (
      <tr key={`${student.id}-${index}`}>
        <td className="table-cell">{student.name}</td>
        <td className="table-cell">{student.email}</td>
        <td className="table-cell">{student.selectedClass}</td>
        <td className="table-cell">{certificate.name}</td>
        <td className="table-cell">
          <a href={certificate.certificateURL} target="_blank" rel="noopener noreferrer">View</a>
        </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CertificateDashboard;
