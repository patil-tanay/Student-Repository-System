import React, { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import './StudentDashboard.css'; // Import CSS file for styling

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [selectedSection, setSelectedSection] = useState('Profile');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [educationDetails, setEducationDetails] = useState([]);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [schoolType, setSchoolType] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [yearOfPassing, setYearOfPassing] = useState('');
  const [percentageOrCGPA, setPercentageOrCGPA] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [achievementDetails, setAchievementDetails] = useState([]);
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [achievementName, setAchievementName] = useState('');
  const [achievementOrganization, setAchievementOrganization] = useState('');
  const [achievementDate, setAchievementDate] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');
  const [extraCurricularDetails, setExtraCurricularDetails] = useState([]); // New state for extra-curricular details
  const [showAddExtraCurricular, setShowAddExtraCurricular] = useState(false); // New state for showing/hiding add extra-curricular fields
  const [activity, setActivity] = useState('');
  const [position, setPosition] = useState('');
  const [startDateExtraCurricular, setStartDateExtraCurricular] = useState('');
  const [endDateExtraCurricular, setEndDateExtraCurricular] = useState('');
  const [descriptionExtraCurricular, setDescriptionExtraCurricular] = useState('');

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
          if (userDoc.data().extraCurricularDetails) { // Fetch and set extra-curricular details if available
            setExtraCurricularDetails(userDoc.data().extraCurricularDetails);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        name,
        age,
        bio,
        address,
        gender,
        phoneNumber,
        city,
        dob,
        educationDetails,
        experienceDetails,
        achievementDetails,
        extraCurricularDetails // Update extra-curricular details along with other profile information
      });
      setUserData({ ...userData, name, age, bio, address, gender, phoneNumber, city, dob });
      setIsEditing(false);
    }
  };

  
  const renderProfileSection = () => {
    return (
      <div>
        <h2>Profile</h2>
        {isEditing ? (
          <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" />
            <button onClick={handleUpdateProfile}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.name}</p>
            <p>Age: {userData.age}</p>
            <p>Bio: {userData.bio}</p>
            <p>Address: {userData.address}</p>
            <p>Gender: {userData.gender}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
            <p>City: {userData.city}</p>
            <p>Date of Birth: {userData.dob}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        )}
      </div>
    );
  };

  const renderEducationSection = () => {
    return (
      <div>
        <h2>Education</h2>
        {!showAddEducation && (
          <button onClick={() => setShowAddEducation(true)}>Add Education</button>
        )}
        {showAddEducation && (
          <div>
            <select value={schoolType} onChange={(e) => setSchoolType(e.target.value)}>
              <option value="">Select School Type</option>
              <option value="10th">10th School</option>
              <option value="12th">12th School</option>
              <option value="college">College</option>
            </select>
            <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="School/College Name" />
            <input type="text" value={yearOfPassing} onChange={(e) => setYearOfPassing(e.target.value)} placeholder="Year of Passing" />
            <input type="text" value={percentageOrCGPA} onChange={(e) => setPercentageOrCGPA(e.target.value)} placeholder="Percentage/CGPA" />
            {editIndex !== -1 ? (
              <button className="small-button" onClick={handleUpdateEducationDetail}>Update</button>
            ) : (
              <button className="small-button" onClick={handleAddEducationDetail}>Add</button>
            )}
          </div>
        )}
        <div className="education-details">
          <h3>Education Details</h3>
          <ul>
            <li className="header">
              <p>School Type</p>
              <p>School/College Name</p>
              <p>Year of Passing</p>
              <p>Percentage/CGPA</p>
              <p>Actions</p>
            </li>
            {educationDetails.map((education, index) => (
              <li key={index}>
                <p>{education.schoolType}</p>
                <p>{education.schoolName}</p>
                <p>{education.yearOfPassing}</p>
                <p>{education.percentageOrCGPA}</p>
                <button className="small-button" onClick={() => handleEditEducationDetail(index)}>Edit</button>
                <button className="small-button" onClick={() => handleDeleteEducationDetail(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderExperienceSection = () => {
    return (
      <div>
        <h2>Experience</h2>
        {!showAddExperience && (
          <button onClick={() => setShowAddExperience(true)}>Add Experience</button>
        )}
        {showAddExperience && (
          <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Organization" />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            {editIndex !== -1 ? (
              <button className="small-button" onClick={handleUpdateExperienceDetail}>Update</button>
            ) : (
              <button className="small-button" onClick={handleAddExperienceDetail}>Add</button>
            )}
          </div>
        )}
        <div className="experience-details">
          <h3>Experience Details</h3>
          <ul>
            <li className="header">
              <p>Title</p>
              <p>Organization</p>
              <p>Start Date</p>
              <p>End Date</p>
              <p>Description</p>
              <p>Actions</p>
            </li>
            {experienceDetails.map((experience, index) => (
              <li key={index}>
                <p>{experience.title}</p>
                <p>{experience.organization}</p>
                <p>{experience.startDate}</p>
                <p>{experience.endDate}</p>
                <p>{experience.description}</p>
                <button className="small-button" onClick={() => handleEditExperienceDetail(index)}>Edit</button>
                <button className="small-button" onClick={() => handleDeleteExperienceDetail(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderAchievementSection = () => {
    return (
      <div>
        <h2>Achievements</h2>
        {!showAddAchievement && (
          <button onClick={() => setShowAddAchievement(true)}>Add Achievement</button>
        )}
        {showAddAchievement && (
          <div>
            <input type="text" value={achievementName} onChange={(e) => setAchievementName(e.target.value)} placeholder="Achievement Name" />
            <input type="text" value={achievementOrganization} onChange={(e) => setAchievementOrganization(e.target.value)} placeholder="Organization" />
            <input type="date" value={achievementDate} onChange={(e) => setAchievementDate(e.target.value)} placeholder="Date" />
            <textarea value={achievementDescription} onChange={(e) => setAchievementDescription(e.target.value)} placeholder="Description"></textarea>
            {editIndex !== -1 ? (
              <button className="small-button" onClick={handleUpdateAchievementDetail}>Update</button>
            ) : (
              <button className="small-button" onClick={handleAddAchievementDetail}>Add</button>
            )}
          </div>
        )}
        <div className="achievement-details">
          <h3>Achievement Details</h3>
          <ul>
            <li className="header">
              <p>Achievement Name</p>
              <p>Organization</p>
              <p>Date</p>
              <p>Description</p>
              <p>Actions</p>
            </li>
            {achievementDetails.map((achievement, index) => (
              <li key={index}>
                <p>{achievement.achievementName}</p>
                <p>{achievement.achievementOrganization}</p>
                <p>{achievement.achievementDate}</p>
                <p>{achievement.achievementDescription}</p>
                <button className="small-button" onClick={() => handleEditAchievementDetail(index)}>Edit</button>
                <button className="small-button" onClick={() => handleDeleteAchievementDetail(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderExtraCurricularSection = () => { // Rendering function for extra-curricular section
    return (
      <div>
        <h2>Extra-curricular</h2>
        {!showAddExtraCurricular && (
          <button onClick={() => setShowAddExtraCurricular(true)}>Add Extra-curricular</button>
        )}
        {showAddExtraCurricular && (
          <div>
            <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="Activity" />
            <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
            <input type="date" value={startDateExtraCurricular} onChange={(e) => setStartDateExtraCurricular(e.target.value)} placeholder="Start Date" />
            <input type="date" value={endDateExtraCurricular} onChange={(e) => setEndDateExtraCurricular(e.target.value)} placeholder="End Date" />
            <textarea value={descriptionExtraCurricular} onChange={(e) => setDescriptionExtraCurricular(e.target.value)} placeholder="Description"></textarea>
            {editIndex !== -1 ? (
              <button className="small-button" onClick={handleUpdateExtraCurricularDetail}>Update</button>
            ) : (
              <button className="small-button" onClick={handleAddExtraCurricularDetail}>Add</button>
            )}
          </div>
        )}
        <div className="extra-curricular-details">
          <h3>Extra-curricular Details</h3>
          <ul>
            <li className="header">
              <p>Activity</p>
              <p>Position</p>
              <p>Start Date</p>
              <p>End Date</p>
              <p>Description</p>
              <p>Actions</p>
            </li>
            {extraCurricularDetails.map((extraCurricular, index) => (
              <li key={index}>
                <p>{extraCurricular.activity}</p>
                <p>{extraCurricular.position}</p>
                <p>{extraCurricular.startDate}</p>
                <p>{extraCurricular.endDate}</p>
                <p>{extraCurricular.description}</p>
                <button className="small-button" onClick={() => handleEditExtraCurricularDetail(index)}>Edit</button>
                <button className="small-button" onClick={() => handleDeleteExtraCurricularDetail(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (selectedSection) {
      case 'Profile':
        return renderProfileSection();
      case 'Education':
        return renderEducationSection();
      case 'Experience':
        return renderExperienceSection();
      case 'Achievements':
        return renderAchievementSection();
      case 'ExtraCurricular':
        return renderExtraCurricularSection(); // Render extra-curricular section
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      {userData && (
        <div>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="Profile">Profile</option>
            <option value="Education">Education</option>
            <option value="Experience">Experience</option>
            <option value="Achievements">Achievements</option>
            <option value="ExtraCurricular">Extra-curricular</option> {/* Add extra-curricular option */}
          </select>
          {renderSection()}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
