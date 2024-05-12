import React, { useState } from 'react';

function ProfileSection({ userData, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [bio, setBio] = useState(userData.bio);
  const [address, setAddress] = useState(userData.address);
  const [gender, setGender] = useState(userData.gender);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [city, setCity] = useState(userData.city);
  const [dob, setDob] = useState(userData.dob);

  const handleUpdateProfile = () => {
    onUpdateProfile({ name, age, bio, address, gender, phoneNumber, city, dob });
    setIsEditing(false);
  };

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
}

export default ProfileSection;
