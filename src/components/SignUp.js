// Import React and useState
import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import '../style/SignUp.css'; // Import your CSS file

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
      // Clear input fields
      setEmail('');
      setPassword('');
      setRole('');
      // Optionally, you can redirect the user to another page after successful sign-up
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <div className="signup-container">
      <div className="left-section">
      <img
          src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
          alt="Login illustration"
          className="login-illustration"
        /> 
      </div>
      <div className="right-section">
        <h2 className="signup-header">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSignUp}>
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
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </div>
  );
};

export default SignUp;
