// ProfilePage.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // Add other profile fields state variables here

  useEffect(() => {
    // Fetch profile data from Firestore and update state variables
    const fetchProfileData = async () => {
      try {
        const userDoc = await firestore.collection('profiles').doc('studentId').get();
        const userData = userDoc.data();
        setName(userData.name);
        setEmail(userData.email);
        // Update other profile fields state variables here
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      // Save or update profile data in Firestore
      await firestore.collection('profiles').doc('studentId').set({
        name,
        email,
        // Other profile fields
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  return (
    <div>
      <h2>Profile Page</h2>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      {/* Add other profile fields inputs here */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ProfilePage;
