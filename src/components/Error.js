// Error.js
import React from 'react';

const Error = ({ message }) => {
  return (
    <div style={{ color: 'red', marginBottom: '10px' }}>
      {message}
    </div>
  );
};

export default Error;
