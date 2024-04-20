// SignUp.js
import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import Error from './Error'; // Import Error component

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default to student
  const [error, setError] = useState(null); // Add state for error

  const signUpWithEmailAndPassword = async () => {
    try {
      const credential = await auth.createUserWithEmailAndPassword(email, password);
      const { user } = credential;
      // Create user document in Firestore with role
      await firestore.collection('users').doc(user.uid).set({
        email,
        role
      });
      // Redirect to Dashboard or do something else
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message); // Set error state
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <Error message={error} />} {/* Display error message if error state is set */}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="faculty">Faculty</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={signUpWithEmailAndPassword}>Sign Up</button>
    </div>
  );
};

export default SignUp;
