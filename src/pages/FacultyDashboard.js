import React, { useState } from 'react';
import { auth } from '../components/firebase'; // import firebase auth
import PersonalDetails from '../components/FacultyPages/PersonalDetails';
import EducationDetails from '../components/FacultyPages/EducationDetails';
import CertificateDetails from '../components/FacultyPages/Certifications';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import '../style/FacultyDashboard.css'; // import CSS styles

function FacultyDashboard() {
  const [selectedSection, setSelectedSection] = useState('personalDetails');
  const navigate = useNavigate(); // for navigation

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/'); // navigate to login page after logout
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>Faculty Dashboard</h1>
        <p>{auth.currentUser.email}</p> {/* display the email of the current user */}
        <ul>
          <li onClick={() => handleSectionClick('personalDetails')}>Personal Details</li>
          <li onClick={() => handleSectionClick('educationDetails')}>Education Details</li>
          <li onClick={() => handleSectionClick('certificationDetails')}>Certification Details</li>
          {/* Add other list items here for other sections */}
        </ul>
        <button onClick={handleLogout}>Logout</button> {/* logout button */}
      </div>
      <div className="main-content">
        {selectedSection === 'personalDetails' && <PersonalDetails />}
        {selectedSection === 'educationDetails' && <EducationDetails />}
        {selectedSection === 'certificationDetails' && <CertificateDetails />}
        {/* Add other sections here */}
      </div>
    </div>
  );
}

export default FacultyDashboard;