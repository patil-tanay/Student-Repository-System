// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, firestore } from '../firebase';
import StudentDetailsForm from '../components/StudentDetailsForm';
import UserProfileUpdate from '../components/UserProfileUpdate';
import FileUpload from '../components/FileUpload';

const Dashboard = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        fetchUserRole(user.uid);
      } else {
        setCurrentUser(null);
        setUserRole('');
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      const userDoc = await firestore.collection('users').doc(userId).get();
      setUserRole(userDoc.data().role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect to sign-in page after logout
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {currentUser && (
        <>
          <p>Welcome, {currentUser.email}!</p>
          <button onClick={handleLogout}>Logout</button>
          <UserProfileUpdate />
          {userRole === 'student' && (
            <>
              <StudentDetailsForm userId={currentUser.uid} />
              <FileUpload userId={currentUser.uid} />
            </>
          )}
          {/* Additional dashboard content based on user role */}
        </>
      )}
    </div>
  );
};

export default Dashboard;




// // StudentDashboard.js
// import React, { useState, useEffect } from 'react';
// import { firestore } from '../firebase';

// const StudentDashboard = ({ userId }) => {
//   const [personalInfo, setPersonalInfo] = useState({
//     name: '',
//     email: '',
//     dob: '',
//     phone: '',
//     city: ''
//   });

//   const [academicInfo, setAcademicInfo] = useState([]);
//   const [achievements, setAchievements] = useState([]);
//   const [internships, setInternships] = useState([]);

//   useEffect(() => {
//     const fetchPersonalInfo = async () => {
//       try {
//         const personalInfoRef = firestore.collection('personalInfo').doc(userId);
//         const personalInfoDoc = await personalInfoRef.get();

//         if (personalInfoDoc.exists) {
//           setPersonalInfo(personalInfoDoc.data());
//         }
//       } catch (error) {
//         console.error('Error fetching personal info:', error);
//       }
//     };

//     const fetchAcademicInfo = async () => {
//       try {
//         const academicInfoRef = firestore.collection('academicInfo').doc(userId);
//         const academicInfoDoc = await academicInfoRef.get();

//         if (academicInfoDoc.exists) {
//           setAcademicInfo(academicInfoDoc.data().courses);
//         }
//       } catch (error) {
//         console.error('Error fetching academic info:', error);
//       }
//     };

//     const fetchAchievements = async () => {
//       try {
//         const achievementsRef = firestore.collection('achievements').doc(userId);
//         const achievementsDoc = await achievementsRef.get();

//         if (achievementsDoc.exists) {
//           setAchievements(achievementsDoc.data().achievements);
//         }
//       } catch (error) {
//         console.error('Error fetching achievements:', error);
//       }
//     };

//     const fetchInternships = async () => {
//       try {
//         const internshipsRef = firestore.collection('internships').doc(userId);
//         const internshipsDoc = await internshipsRef.get();

//         if (internshipsDoc.exists) {
//           setInternships(internshipsDoc.data().internships);
//         }
//       } catch (error) {
//         console.error('Error fetching internships:', error);
//       }
//     };

//     fetchPersonalInfo();
//     fetchAcademicInfo();
//     fetchAchievements();
//     fetchInternships();
//   }, [userId]);

//   const handlePersonalInfoSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await firestore.collection('personalInfo').doc(userId).set(personalInfo, { merge: true });
//       console.log('Personal info updated successfully!');
//     } catch (error) {
//       console.error('Error updating personal info:', error);
//     }
//   };

//   const handleAcademicInfoSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await firestore.collection('academicInfo').doc(userId).set({ courses: academicInfo });
//       console.log('Academic info updated successfully!');
//     } catch (error) {
//       console.error('Error updating academic info:', error);
//     }
//   };

//   const handleAchievementsSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await firestore.collection('achievements').doc(userId).set({ achievements });
//       console.log('Achievements updated successfully!');
//     } catch (error) {
//       console.error('Error updating achievements:', error);
//     }
//   };

//   const handleInternshipsSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await firestore.collection('internships').doc(userId).set({ internships });
//       console.log('Internships updated successfully!');
//     } catch (error) {
//       console.error('Error updating internships:', error);
//     }
//   };

//   const handlePersonalInfoChange = (e) => {
//     const { name, value } = e.target;
//     setPersonalInfo(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleAcademicInfoChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedAcademicInfo = [...academicInfo];
//     updatedAcademicInfo[index][name] = value;
//     setAcademicInfo(updatedAcademicInfo);
//   };

//   const handleAchievementsChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedAchievements = [...achievements];
//     updatedAchievements[index][name] = value;
//     setAchievements(updatedAchievements);
//   };

//   const handleInternshipsChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedInternships = [...internships];
//     updatedInternships[index][name] = value;
//     setInternships(updatedInternships);
//   };

//   return (
//     <div>
//       <h2>Student Dashboard</h2>

//       <h3>Personal Information</h3>
//       <form onSubmit={handlePersonalInfoSubmit}>
//         <label>Name:</label>
//         <input type="text" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
//         <label>Email:</label>
//         <input type="email" name="email" value={personalInfo.email} disabled />
//         <label>Date of Birth:</label>
//         <input type="date" name="dob" value={personalInfo.dob} onChange={handlePersonalInfoChange} />
//         <label>Phone:</label>
//         <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
//         <label>City:</label>
//         <input type="text" name="city" value={personalInfo.city} onChange={handlePersonalInfoChange} />
//         <button type="submit">Save</button>
//       </form>

//       <h3>Academic Information</h3>
//       <form onSubmit={handleAcademicInfoSubmit}>
//         {academicInfo.map((course, index) => (
//           <div key={index}>
//             <input type="text" name="name" value={course.name} onChange={(e) => handleAcademicInfoChange(index, e)} />
//             <input type="text" name="grade" value={course.grade} onChange={(e) => handleAcademicInfoChange(index, e)} />
//           </div>
//         ))}
//         <button type="submit">Save</button>
//       </form>

//       <h3>Achievements</h3>
//       <form onSubmit={handleAchievementsSubmit}>
//         {achievements.map((achievement, index) => (
//           <div key={index}>
//             <input type="text" name="name" value={achievement.name} onChange={(e) => handleAchievementsChange(index, e)} />
//             <input type="date" name="date" value={achievement.date} onChange={(e) => handleAchievementsChange(index, e)} />
//             <input type="text" name="description" value={achievement.description} onChange={(e) => handleAchievementsChange(index, e)} />
//             <input type="text" name="organization" value={achievement.organization} onChange={(e) => handleAchievementsChange(index, e)} />
//           </div>
//         ))}
//         <button type="submit">Save</button>
//       </form>

//       <h3>Internships</h3>
//       <form onSubmit={handleInternshipsSubmit}>
//         {internships.map((internship, index) => (
//           <div key={index}>
//             <input type="text" name="title" value={internship.title} onChange={(e) => handleInternshipsChange(index, e)} />
//             <input type="text" name="org" value={internship.org} onChange={(e) => handleInternshipsChange(index, e)} />
//             <input type="date" name="startDate" value={internship.startDate} onChange={(e) => handleInternshipsChange(index, e)} />
//             <input type="date" name="endDate" value={internship.endDate} onChange={(e) => handleInternshipsChange(index, e)} />
//             <input type="text" name="description" value={internship.description} onChange={(e) => handleInternshipsChange(index, e)} />
//           </div>
//         ))}
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

// export default StudentDashboard;







// // StudentDashboard.js
// import React, { useState, useEffect } from 'react';
// import { firestore } from '../firebase';
// // import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// // import StudentDashboard from './StudentDashboard';
// import EducationForm from './EducationForm';


// const StudentDashboard = ({ userId }) => {
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     gender: '',
//     address: '',
//     phone: '',
//     city: '',
//     dob: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const doc = await firestore.collection('profiles').doc(userId).get();
//         if (doc.exists) {
//           setProfile(doc.data());
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };
//     fetchProfile();
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await firestore.collection('profiles').doc(userId).set(profile, { merge: true });
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Student Dashboard</h2>
//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <label>Name:</label>
//           <input type="text" name="name" value={profile.name} onChange={handleChange} />
//           <label>Email:</label>
//           <input type="email" name="email" value={profile.email} onChange={handleChange} />
//           <label>Gender:</label>
//           <select name="gender" value={profile.gender} onChange={handleChange}>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//           <label>Address:</label>
//           <input type="text" name="address" value={profile.address} onChange={handleChange} />
//           <label>Phone:</label>
//           <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
//           <label>City:</label>
//           <input type="text" name="city" value={profile.city} onChange={handleChange} />
//           <label>Date of Birth:</label>
//           <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
//           <button type="submit">Save</button>
//         </form>
//       ) : (
//         <div>
//           <p>Name: {profile.name}</p>
//           <p>Email: {profile.email}</p>
//           <p>Gender: {profile.gender}</p>
//           <p>Address: {profile.address}</p>
//           <p>Phone: {profile.phone}</p>
//           <p>City: {profile.city}</p>
//           <p>Date of Birth: {profile.dob}</p>
//           <button onClick={() => setIsEditing(true)}>Edit Profile</button>

//           <Routes>
//             {/* <Route path="/" element={<StudentDashboard userId={userId} />} /> */}
//             <Route path="/education" element={<EducationForm userId={userId} />} />
//             </Routes>
        
//         </div>
        
//       )}
//     </div>
//   );
// };

// export default StudentDashboard;


// // Dashboard.js
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import StudentDashboard from './StudentDashboard';
// import EducationForm from './EducationForm';

// const Dashboard = ({ userId }) => {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <Routes>
//         <Route path="/" element={<StudentDashboard userId={userId} />} />
//         <Route path="/education" element={<EducationForm userId={userId} />} />
//       </Routes>
//     </div>
//   );
// };

// export default Dashboard;
