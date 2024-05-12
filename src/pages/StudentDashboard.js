import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../components/firebase';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import AchievementSection from '../components/AchievementSection';
import ExtraCurricularSection from '../components/ExtraCurricularSection';
import SkillsSection from '../components/SkillsSection';
import ProfileSection from '../components/ProfileSection'; // Import ProfileSection component
import MarksheetSection from '../components/MarksheetSection';
import ProjectSection from '../components/ProjectSection';
import '../style/StudentDashboard.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
          if (userDoc.data().educationDetails) {
            setEducationDetails(userDoc.data().educationDetails);
          }
          if (userDoc.data().experienceDetails) {
            setExperienceDetails(userDoc.data().experienceDetails);
          }
          if (userDoc.data().achievementDetails) {
            setAchievementDetails(userDoc.data().achievementDetails);
          }
          if (userDoc.data().extraCurricularDetails) {
            setExtraCurricularDetails(userDoc.data().extraCurricularDetails);
          }
          if (userDoc.data().skills) {
            setSkills(userDoc.data().skills);
          }
          if (userDoc.data().marksheetDetails) { // Fetch marksheet details if available
            setMarksheetDetails(userDoc.data().marksheetDetails);
          }
          if (userDoc.data().projectDetails) { // Fetch project details if available
            setProjectDetails(userDoc.data().projectDetails);
          }
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
      await firestore.collection('users').doc(user.uid).update({
        skills: updatedSkills
      });
      setSkills(updatedSkills);
    }
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h1>Dashboard</h1>
        <ul>
          <li onClick={() => handleSectionClick('profile')}>Profile</li>
          <li onClick={() => handleSectionClick('education')}>Education</li>
          <li onClick={() => handleSectionClick('experience')}>Experience</li>
          <li onClick={() => handleSectionClick('achievement')}>Achievements</li>
          <li onClick={() => handleSectionClick('extracurricular')}>Extra Curricular</li>
          <li onClick={() => handleSectionClick('skills')}>Skills</li>
          <li onClick={() => handleSectionClick('marksheets')}>Marksheets</li>
          <li onClick={() => handleSectionClick('projects')}>Projects</li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
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
      </div>
    </div>
  );
}

export default StudentDashboard;
