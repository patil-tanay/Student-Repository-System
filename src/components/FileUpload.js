// FileUpload.js
import React, { useState } from 'react';
import { storage, firestore } from '../firebase';

const FileUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`${userId}/${fileName}`);
      await fileRef.put(file);
      const downloadURL = await fileRef.getDownloadURL();
      await firestore.collection('studentFiles').add({
        userId,
        fileName,
        downloadURL
      });
      // Optionally display a success message or reset form
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p>Selected file: {fileName}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
