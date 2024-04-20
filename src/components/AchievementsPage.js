// AchievementsPage.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState('');
  const [achievementDate, setAchievementDate] = useState('');
  const [organisation, setOrganisation] = useState('');

  useEffect(() => {
    // Fetch achievements data from Firestore and update state variables
    const fetchAchievementsData = async () => {
      try {
        const achievementsSnapshot = await firestore.collection('achievements').doc('studentId').get();
        const achievementsData = achievementsSnapshot.data();
        setAchievements(achievementsData.achievements || []);
      } catch (error) {
        console.error('Error fetching achievements data:', error);
      }
    };
    fetchAchievementsData();
  }, []);

  const handleAddAchievement = () => {
    const newAchievementItem = {
      achievement: newAchievement,
      date: achievementDate,
      organisation: organisation,
    };
    setAchievements([...achievements, newAchievementItem]);
    setNewAchievement('');
    setAchievementDate('');
    setOrganisation('');
  };

  const handleSave = async () => {
    try {
      // Save or update achievements data in Firestore
      await firestore.collection('achievements').doc('studentId').set({
        achievements: achievements,
      });
      alert('Achievements updated successfully!');
    } catch (error) {
      console.error('Error saving achievements data:', error);
    }
  };

  return (
    <div>
      <h2>Achievements Page</h2>
      <div>
        <input type="text" value={newAchievement} onChange={(e) => setNewAchievement(e.target.value)} placeholder="Achievement" />
        <input type="date" value={achievementDate} onChange={(e) => setAchievementDate(e.target.value)} />
        <input type="text" value={organisation} onChange={(e) => setOrganisation(e.target.value)} placeholder="Organisation" />
        <button onClick={handleAddAchievement}>Add Achievement</button>
      </div>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index}>
            {achievement.achievement} - {achievement.date} - {achievement.organisation}
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AchievementsPage;
