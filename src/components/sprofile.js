import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const StudentProfile = ({ userId }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
    city: ''
  });

  const [oldProfile, setOldProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRef = firestore.collection('profiles').doc(userId);
        const profileDoc = await profileRef.get();

        if (profileDoc.exists) {
          setProfile(profileDoc.data());
          setOldProfile(profileDoc.data());
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]); // Fetch profile data whenever userId changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection('profiles').doc(userId).set(profile, { merge: true });
      console.log('Profile updated successfully!');
      setOldProfile(profile); // Update oldProfile state after saving changes
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Student Profile</h2>

      <div>
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Date of Birth:</strong> {profile.dob}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>City:</strong> {profile.city}</p>
      </div>

      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={profile.email} disabled />
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
        <label>Phone:</label>
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
        <label>City:</label>
        <input type="text" name="city" value={profile.city} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>

      {oldProfile && (
        <div>
          <h3>Old Profile</h3>
          <p><strong>Name:</strong> {oldProfile.name}</p>
          <p><strong>Email:</strong> {oldProfile.email}</p>
          <p><strong>Date of Birth:</strong> {oldProfile.dob}</p>
          <p><strong>Phone:</strong> {oldProfile.phone}</p>
          <p><strong>City:</strong> {oldProfile.city}</p>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
