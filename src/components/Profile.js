import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import './ProfilePage.css'; // Import CSS for styling

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDoc = await firestore.collection('profiles').doc('studentId').get();
        const userData = userDoc.data();
        setName(userData.name || '');
        setEmail(userData.email || '');
        setGender(userData.gender || '');
        setAddress(userData.address || '');
        setPhoneNumber(userData.phoneNumber || '');
        setEnrollmentNo(userData.enrollmentNo || '');
        setDob(userData.dob || '');
        setCity(userData.city || '');
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleSave = async () => {
    try {
      if (!name || !email) {
        setError('Name and Email are required.');
        return;
      }
      // Other validations can be added here

      await firestore.collection('profiles').doc('studentId').set({
        name,
        email,
        gender,
        address,
        phoneNumber,
        enrollmentNo,
        dob,
        city,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile data:', error);
      setError('Error saving profile data. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile Page</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Enrollment No.:</label>
        <input type="text" value={enrollmentNo} onChange={(e) => setEnrollmentNo(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ProfilePage;
