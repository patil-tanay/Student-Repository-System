// // SignIn.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, firestore } from '../firebase';
// import Error from './Error';

// const SignIn = () => {
//   const navigate = useNavigate(); // Use useNavigate hook for navigation
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const signInWithEmailAndPassword = async () => {
//     try {
//       const { user } = await auth.signInWithEmailAndPassword(email, password);
//       // Fetch user role from Firestore
//       const userDoc = await firestore.collection('users').doc(user.uid).get();
//       const role = userDoc.data().role;
//       // Redirect based on user role
//       switch (role) {
//         case 'student':
//           navigate('/dashboard');
//           break;
//         case 'faculty':
//           navigate('/faculty');
//           break;
//         case 'admin':
//           navigate('/admin');
//           break;
//         default:
//           navigate('/'); // Redirect to default route if role is not recognized
//       }
//     } catch (error) {
//       console.error('Error signing in:', error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
//       {error && <Error message={error} />}
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={signInWithEmailAndPassword}>Sign In</button>
//     </div>
//   );
// };

// export default SignIn;




// SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';
import Error from './Error';
import './SignIn.css'; // Import custom CSS for styling

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPassword = async () => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      const role = userDoc.data().role;
      switch (role) {
        case 'student':
          navigate('/dashboard');
          break;
        case 'faculty':
          navigate('/faculty');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message);
    }
  };

  return (
    <div className="signin-container">
      <h2 className="signin-title">Sign In</h2>
      {error && <Error message={error} />}
      <input className="signin-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="signin-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="signin-button" onClick={signInWithEmailAndPassword}>Sign In</button>
    </div>
  );
};

export default SignIn;

