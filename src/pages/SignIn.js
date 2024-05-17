import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../style/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      const userDoc = await firestore.collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      const userRole = userData.role;

      switch (userRole) {
        case 'student':
          navigate('/StudentDashboard');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'faculty':
          navigate('/faculty');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No user with this email found');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else {
        setError('An error occurred. Please try again');
      }
    }
  };

  const handleAdminSignUp = () => {
    navigate('/signup');
  };


  return (
    <div className="signin-container">
      <div className="left-section">
        <img
          src="https://i.postimg.cc/MpQfqn30/White-Green-Student-Classmeeting-Poster-1.png"
          alt="Login illustration"
          className="login-illustration"
        />
      </div>
      <div className="right-section">
        <h2 className="signin-header">Sign In</h2>
        {error && <p className="error">{error}</p>}
        <form className="signin-form" onSubmit={handleSignIn}>
          <div className="form-group">
            <label>Email:</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="signin-button" type="submit">Sign In</button>
        </form>
        <button className="admin-signup-button" onClick={handleAdminSignUp}>Admin Page</button>
      </div>
    </div>
  );
};

export default SignIn;
