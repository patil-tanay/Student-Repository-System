// CustomYearDropdown.js

import React from 'react';

const CustomYearDropdown = ({ year, onChange }) => {
  const years = [];
  for (let i = year - 2; i <= year + 2; i++) {
    years.push(i);
  }

  const handleChange = (e) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <select value={year} onChange={handleChange}>
      {years.map((y) => (
        <option key={y} value={y}>
          {y}
        </option>
      ))}
    </select>
  );
};

export default CustomYearDropdown;
