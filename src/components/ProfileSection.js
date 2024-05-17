// // ProfileSection.js
// import React, { useState } from 'react';
// import '../style/ProfileSection.css'; // Import CSS file for styling

// function ProfileSection({ userData, onUpdateProfile }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState(userData.name);
//   const [age, setAge] = useState(userData.age);
//   const [bio, setBio] = useState(userData.bio);
//   const [address, setAddress] = useState(userData.address);
//   const [gender, setGender] = useState(userData.gender);
//   const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
//   const [city, setCity] = useState(userData.city);
//   const [dob, setDob] = useState(userData.dob);
//   const [enrollmentNumber, setEnrollmentNumber] = useState(userData.enrollmentNumber);
//   const [selectedClass, setSelectedClass] = useState(userData.selectedClass || 'CS1');

//   const handleUpdateProfile = () => {
//     onUpdateProfile({ name, age, bio, address, gender, phoneNumber, city, dob, enrollmentNumber, selectedClass });
//     setIsEditing(false);
//   };

//   return (
//     <div className="profile-section-container">
//       <h2 className="profile-section-title">Profile</h2>
//       {isEditing ? (
//         <div>
//           <div className="profile-section-field">
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="age">Age:</label>
//             <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="bio">Bio:</label>
//             <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="address">Address:</label>
//             <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="gender">Gender:</label>
//             <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="phoneNumber">Phone Number:</label>
//             <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="city">City:</label>
//             <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="dob">Date of Birth:</label>
//             <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="enrollmentNumber">Enrollment Number:</label>
//             <input type="text" id="enrollmentNumber" value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} placeholder="Enrollment Number" />
//           </div>
//           <div className="profile-section-field">
//             <label htmlFor="class">Class:</label>
//             <select id="class" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
//               <option value="CS1">CS1</option>
//               <option value="CS2">CS2</option>
//               <option value="CS3">CS3</option>
//               <option value="CS4">CS4</option>
//               <option value="CS5">CS5</option>
//             </select>
//           </div>
//           <div className="profile-section-actions">
//             <button className="save" onClick={handleUpdateProfile}>Save</button>
//             <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
//           </div>
//         </div>
//       ) : (
//         <div className="profile-section-data">
//           <div className="profile-section-item">
//             <span className="item-label">Email:</span>
//             <span className="item-value">{userData.email}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Name:</span>
//             <span className="item-value">{userData.name}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Age:</span>
//             <span className="item-value">{userData.age}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Bio:</span>
//             <span className="item-value">{userData.bio}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Address:</span>
//             <span className="item-value">{userData.address}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Gender:</span>
//             <span className="item-value">{userData.gender}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Phone Number:</span>
//             <span className="item-value">{userData.phoneNumber}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">City:</span>
//             <span className="item-value">{userData.city}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Date of Birth:</span>
//             <span className="item-value">{userData.dob}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Enrollment Number:</span>
//             <span className="item-value">{userData.enrollmentNumber}</span>
//           </div>
//           <div className="profile-section-item">
//             <span className="item-label">Class:</span>
//             <span className="item-value">{userData.selectedClass}</span>
//           </div>
//           <div className="profile-section-actions">
//             <button onClick={() => setIsEditing(true)}>Edit</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfileSection;


import React, { useState } from 'react';
import '../style/ProfileSection.css'; // Import CSS file for styling

function ProfileSection({ userData, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [age, setAge] = useState(userData.age);
  const [bio, setBio] = useState(userData.bio);
  const [address, setAddress] = useState(userData.address);
  const [gender, setGender] = useState(userData.gender || 'Male');
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [city, setCity] = useState(userData.city);
  const [dob, setDob] = useState(userData.dob);
  const [enrollmentNumber, setEnrollmentNumber] = useState(userData.enrollmentNumber);
  const [selectedClass, setSelectedClass] = useState(userData.selectedClass || 'CS1');

  const handleUpdateProfile = () => {
    onUpdateProfile({ name, age, bio, address, gender, phoneNumber, city, dob, enrollmentNumber, selectedClass });
    setIsEditing(false);
  };

  return (
    <div className="profile-section-container">
      <h2 className="profile-section-title">Profile</h2>
      {isEditing ? (
        <div className="edit-profile-form">
          <div className="profile-section-field">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </div>
          <div className="profile-section-field">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
          </div>
          <div className="profile-section-field">
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio"></textarea>
          </div>
          <div className="profile-section-field">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
          </div>
          <div className="profile-section-field">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="profile-section-field">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" />
          </div>
          <div className="profile-section-field">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
          </div>
          <div className="profile-section-field">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="Date of Birth" />
          </div>
          <div className="profile-section-field">
            <label htmlFor="enrollmentNumber">Enrollment Number:</label>
            <input type="text" id="enrollmentNumber" value={enrollmentNumber} onChange={(e) => setEnrollmentNumber(e.target.value)} placeholder="Enrollment Number" />
          </div>
          <div className="profile-section-field">
            <label htmlFor="class">Class:</label>
            <select id="class" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="CS1">CS1</option>
              <option value="CS2">CS2</option>
              <option value="CS3">CS3</option>
              <option value="CS4">CS4</option>
              <option value="CS5">CS5</option>
            </select>
          </div>
          <div className="profile-section-actions">
            <button className="save" onClick={handleUpdateProfile}>Save</button>
            <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-section-data">
          <div className="profile-section-item">
            <span className="item-label">Email:</span>
            <span className="item-value">{userData.email}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Name:</span>
            <span className="item-value">{userData.name}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Age:</span>
            <span className="item-value">{userData.age}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Bio:</span>
            <span className="item-value">{userData.bio}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Address:</span>
            <span className="item-value">{userData.address}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Gender:</span>
            <span className="item-value">{userData.gender}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Phone Number:</span>
            <span className="item-value">{userData.phoneNumber}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">City:</span>
            <span className="item-value">{userData.city}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Date of Birth:</span>
            <span className="item-value">{userData.dob}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Enrollment Number:</span>
            <span className="item-value">{userData.enrollmentNumber}</span>
          </div>
          <div className="profile-section-item">
            <span className="item-label">Class:</span>
            <span className="item-value">{userData.selectedClass}</span>
          </div>
          <div className="profile-section-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSection;
