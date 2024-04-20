// InternshipExperiencePage.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const InternshipExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [title, setTitle] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch internship experiences data from Firestore and update state variables
    const fetchExperiencesData = async () => {
      try {
        const experiencesSnapshot = await firestore.collection('internshipExperiences').doc('studentId').get();
        const experiencesData = experiencesSnapshot.data();
        setExperiences(experiencesData.experiences || []);
      } catch (error) {
        console.error('Error fetching internship experiences data:', error);
      }
    };
    fetchExperiencesData();
  }, []);

  const handleAddExperience = () => {
    const newExperienceItem = {
      title: title,
      organisation: organisation,
      startDate: startDate,
      endDate: endDate,
      description: description,
    };
    setExperiences([...experiences, newExperienceItem]);
    setTitle('');
    setOrganisation('');
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  const handleSave = async () => {
    try {
      // Save or update internship experiences data in Firestore
      await firestore.collection('internshipExperiences').doc('studentId').set({
        experiences: experiences,
      });
      alert('Internship experiences updated successfully!');
    } catch (error) {
      console.error('Error saving internship experiences data:', error);
    }
  };

  return (
    <div>
      <h2>Internship Experience Page</h2>
      <div>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder="Organisation" />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button onClick={handleAddExperience}>Add Experience</button>
      </div>
      <ul>
        {experiences.map((experience, index) => (
          <li key={index}>
            {experience.title} - {experience.organisation} - {experience.startDate} - {experience.endDate} - {experience.description}
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default InternshipExperiencePage;
