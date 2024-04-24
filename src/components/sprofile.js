import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import Profile from './Profile'; // Assuming you have a Profile component
import './sprofile.css'; // Import CSS file

const StudentDashboard = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [showProfile, setShowProfile] = useState(false); // State to control profile visibility

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data from Firestore based on userId
        const docRef = firestore.collection('profiles').doc(userId);
        const doc = await docRef.get();
        if (doc.exists) {
          setProfileData(doc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfileData();
  }, [userId]);

  const handleUpdateProfile = async (updatedProfileData) => {
    try {
      // Update profile data in Firestore
      await firestore.collection('profiles').doc(userId).set(updatedProfileData, { merge: true });
      setProfileData(updatedProfileData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    // Sign out user
    auth.signOut().catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile); // Toggle profile visibility
  };

  return (
    <div className="student-dashboard">
      <h2>Student Dashboard</h2>
      <button onClick={handleLogout}>Logout</button> {/* Add Logout button */}
      {error && <p className="error">{error}</p>}
      <div className="profile-dropdown">
        <button onClick={toggleProfile} className="profile-dropdown-toggle">
          Profile
        </button>
        {showProfile && ( // Render profile fields if showProfile is true
          <div className="profile-section">
            <Profile profileData={profileData} onUpdateProfile={handleUpdateProfile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
