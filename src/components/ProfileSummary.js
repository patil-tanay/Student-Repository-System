import React from 'react';

function ProfileSummary({ userData }) {
  return (
    <div>
      <h2>Profile Summary</h2>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Age: {userData.age}</p>
      <p>Bio: {userData.bio}</p>
      <p>Address: {userData.address}</p>
      <p>Gender: {userData.gender}</p>
      <p>Phone Number: {userData.phoneNumber}</p>
      <p>City: {userData.city}</p>
      <p>Date of Birth: {userData.dob}</p>
    </div>
  );
}

export default ProfileSummary;
