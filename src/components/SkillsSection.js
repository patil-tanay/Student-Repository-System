import React, { useState } from 'react';
import '../style/SkillsSection.css'; // Import CSS file for styling

function SkillsSection({ skills, onUpdateSkills }) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      const updatedSkills = [...skills, newSkill];
      onUpdateSkills(updatedSkills);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    onUpdateSkills(updatedSkills);
  };

  return (
    <div className="skills-section-container">
      <h2>Skills</h2>
      <div className="input-container">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add Skill"
        />
        <button onClick={handleAddSkill}>Add</button>
      </div>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index}>
            {skill}
            <button onClick={() => handleDeleteSkill(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillsSection;
