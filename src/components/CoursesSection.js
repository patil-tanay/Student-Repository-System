import React, { useState } from 'react';

function CoursesSection({ courses, onUpdateCourses }) {
  const [newCourse, setNewCourse] = useState('');

  const handleAddCourse = () => {
    if (newCourse.trim() !== '') {
      const updatedCourses = [...courses, newCourse];
      onUpdateCourses(updatedCourses);
      setNewCourse('');
    }
  };

  const handleDeleteCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    onUpdateCourses(updatedCourses);
  };

  return (
    <div>
      <h2>Courses</h2>
      <div>
        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Add Course"
        />
        <button onClick={handleAddCourse}>Add</button>
      </div>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            {course}
            <button onClick={() => handleDeleteCourse(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursesSection;
