import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Fetch user role from Firestore
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      const userRole = userData.role;

      // Redirect user to the appropriate dashboard based on role
      switch (userRole) {
        case 'student':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/admin');
          break;

          case 'faculty':
            navigate('/faculty');
            break;
        // Add more cases for other roles if needed
        default:
          // Redirect to a default dashboard or home page if role is unknown
          navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
