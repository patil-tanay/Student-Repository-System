import React, { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import ProfileSection from './ProfileSection'; // Import ProfileSection component

function StudentDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      }
    };

    fetchUserData();
  }, []);

  /////////////////////////////

  const onUpdateProfile = async (updatedProfile) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update(updatedProfile);
      setUserData({ ...userData, ...updatedProfile });
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      {userData && ( // Check if userData exists before rendering ProfileSection
        <ProfileSection userData={userData} onUpdateProfile={onUpdateProfile} />
      )}
    </div>
  );
}

export default StudentDashboard;
