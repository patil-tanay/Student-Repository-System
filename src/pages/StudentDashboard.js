// StudentDashboard.js

import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../components/firebase';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import AchievementSection from '../components/AchievementSection';
import ExtraCurricularSection from '../components/ExtraCurricularSection';
import SkillsSection from '../components/SkillsSection';
import ProfileSection from '../components/ProfileSection';
import MarksheetSection from '../components/MarksheetSection';
import ProjectSection from '../components/ProjectSection';
import CertificateSection from '../components/CertificateSection';
import '../style/StudentDashboard.css';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [userData, setUserData] = useState(null);
  const [educationDetails, setEducationDetails] = useState([]);
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [achievementDetails, setAchievementDetails] = useState([]);
  const [selectedSection, setSelectedSection] = useState('profile');
  const [extraCurricularDetails, setExtraCurricularDetails] = useState([]);
  const [skills, setSkills] = useState([]);
  const [marksheetDetails, setMarksheetDetails] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);
  const [certificateDetails, setCertificateDetails] = useState([]);
  const navigate = useNavigate();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setUserData(data);
          setEducationDetails(data.educationDetails || []);
          setExperienceDetails(data.experienceDetails || []);
          setAchievementDetails(data.achievementDetails || []);
          setExtraCurricularDetails(data.extraCurricularDetails || []);
          setSkills(data.skills || []);
          setMarksheetDetails(data.marksheetDetails || []);
          setProjectDetails(data.projectDetails || []);
          setCertificateDetails(data.certificateDetails || []);
        }
      }
    };

    fetchUserData();
  }, []);

  const onUpdateProfile = async (updatedProfile) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update(updatedProfile);
      setUserData({ ...userData, ...updatedProfile });
    }
  };

  const onUpdateSkills = async (updatedSkills) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({ skills: updatedSkills });
      setSkills(updatedSkills);
    }
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.updatePassword(newPassword);
        alert('Password changed successfully');
        setIsChangingPassword(false);
        setNewPassword('');
      } else {
        throw new Error('No user is currently signed in');
      }
    } catch (error) {
      console.error('Error changing password', error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>Dashboard</h1>
        {userData ? (
          <>
            <h4 className='data'>{userData.email}</h4>
            <h3 className='data'>{userData.name}</h3>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {isChangingPassword ? (
          <div>
            <input
              className='password-input'
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <button onClick={handleChangePassword}>Submit</button>
            <button onClick={() => setIsChangingPassword(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsChangingPassword(true)}>Change Password</button>
        )}
        <button className="button-primary" onClick={handleLogout}>Logout</button>
        
        <ul>
          <li onClick={() => handleSectionClick('profile')}>Profile</li>
          <li onClick={() => handleSectionClick('education')}>Education</li>
          <li onClick={() => handleSectionClick('experience')}>Experience</li>
          <li onClick={() => handleSectionClick('achievement')}>Achievements</li>
          <li onClick={() => handleSectionClick('extracurricular')}>Extra Curricular</li>
          <li onClick={() => handleSectionClick('skills')}>Skills</li>
          <li onClick={() => handleSectionClick('marksheets')}>Marksheets</li>
          <li onClick={() => handleSectionClick('projects')}>Projects</li>
          <li onClick={() => handleSectionClick('certificates')}>Certificates</li>
        </ul>
      </div>
      <div className="main-content">
        {selectedSection === 'profile' && userData && (
          <ProfileSection userData={userData} onUpdateProfile={onUpdateProfile} />
        )}
        {selectedSection === 'education' && (
          <EducationSection
            educationDetails={educationDetails}
            setEducationDetails={setEducationDetails}
          />
        )}
        {selectedSection === 'experience' && (
          <ExperienceSection
            experienceDetails={experienceDetails}
            setExperienceDetails={setExperienceDetails}
          />
        )}
        {selectedSection === 'achievement' && (
          <AchievementSection
            achievementDetails={achievementDetails}
            setAchievementDetails={setAchievementDetails}
          />
        )}
        {selectedSection === 'extracurricular' && (
          <ExtraCurricularSection
            extraCurricularDetails={extraCurricularDetails}
            setExtraCurricularDetails={setExtraCurricularDetails}
          />
        )}
        {selectedSection === 'skills' && (
          <SkillsSection
            skills={skills}
            onUpdateSkills={onUpdateSkills}
          />
        )}
        {selectedSection === 'marksheets' && (
          <MarksheetSection
            marksheetDetails={marksheetDetails}
            setMarksheetDetails={setMarksheetDetails}
          />
        )}
        {selectedSection === 'projects' && (
          <ProjectSection
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
          />
        )}
        {selectedSection === 'certificates' && (
          <CertificateSection
            certificateDetails={certificateDetails}
            setCertificateDetails={setCertificateDetails}
          />
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
