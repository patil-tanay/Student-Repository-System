// UserProfileUpdate.js
import React, { useState } from 'react';
import { auth } from '../firebase';

const UserProfileUpdate = () => {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (newEmail !== '') {
        await user.updateEmail(newEmail);
      }
      if (newPassword !== '') {
        await user.updatePassword(newPassword);
      }
      // Optionally display a success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <input type="email" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleUpdateProfile}>Update</button>
    </div>
  );
};

export default UserProfileUpdate;
