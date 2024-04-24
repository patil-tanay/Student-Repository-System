import React, { useState } from 'react';
import { auth, firestore } from '../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError(null); // Clear any previous error
      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Set role in Firestore user profile
      await firestore.collection('users').doc(user.uid).set({
        email: user.email,
        role: role
      });
      

      setSuccessMessage('Account created successfully!'); // Display success message
      // Optionally, you can redirect the user to another page after successful sign-up
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default SignUp;
