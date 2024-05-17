import React, { useState } from 'react';
import { auth, firestore, storage } from './firebase'; // Import Firebase modules
// import '../style/CertificateSection.css';

function CertificateSection({ certificateDetails, setCertificateDetails }) {
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [certificateName, setCertificateName] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);

  const handleAddCertificate = async () => {
    // Upload file to Firebase Storage
    const storageRef = storage.ref(`certificates/${certificateFile.name}`);
    await storageRef.put(certificateFile);

    // Get download URL for the uploaded file
    const downloadURL = await storageRef.getDownloadURL();

    // Add certificate details to Firestore
    const newCertificateDetails = [
      ...certificateDetails,
      {
        name: certificateName,
        certificateURL: downloadURL // Store download URL instead of file object
      }
    ];
    setCertificateDetails(newCertificateDetails);
    setCertificateName('');
    setCertificateFile(null);
    setShowAddCertificate(false);
    updateCertificateDetailsInFirestore(newCertificateDetails);
  };

  const handleDeleteCertificate = async (index) => {
    // Delete file from Firebase Storage if it's stored
    const certificate = certificateDetails[index];
    if (certificate.certificateURL) {
      const storageRef = storage.refFromURL(certificate.certificateURL);
      await storageRef.delete();
    }

    // Remove certificate details from Firestore
    const updatedDetails = [...certificateDetails];
    updatedDetails.splice(index, 1);
    setCertificateDetails(updatedDetails);
    updateCertificateDetailsInFirestore(updatedDetails);
  };

  const updateCertificateDetailsInFirestore = async (details) => {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).update({
        certificateDetails: details
      });
    }
  };

  return (
    <div className="certificates-section">
      <h2>Certificates</h2>
      <button onClick={() => setShowAddCertificate(!showAddCertificate)}>
        {showAddCertificate ? "Close Form" : "Add Certificate"}
      </button>

      {showAddCertificate && (
        <div className="certificates-form">
          <input type="text" value={certificateName} onChange={(e) => setCertificateName(e.target.value)} placeholder="Certificate Name" />
          <input type="file" onChange={(e) => setCertificateFile(e.target.files[0])} />
          <button className="add-button" onClick={handleAddCertificate}>Add</button>
        </div>
      )}

      <div className="certificates-details">
        <h3>Certificate Details</h3>
        <table className="certificates-table">
          <thead>
            <tr>
              <th>Certificate Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificateDetails.map((certificate, index) => (
              <tr key={index}>
                <td>{certificate.name}</td>
                <td>
                  <a className="view-button" href={certificate.certificateURL} target="_blank" rel="noopener noreferrer">View</a>
                  <button className="delete-button" onClick={() => handleDeleteCertificate(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CertificateSection;
