// withAuthRole.js
import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../firebase';

const withAuthRole = (allowedRoles) => (WrappedComponent) => {
  const WithAuthRole = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setCurrentUser(user);
          fetchUserRole(user.uid);
        } else {
          setCurrentUser(null);
          setUserRole('');
        }
      });
      return () => unsubscribe();
    }, []);

    const fetchUserRole = async (userId) => {
      try {
        const userDoc = await firestore.collection('users').doc(userId).get();
        setUserRole(userDoc.data().role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const isAllowed = allowedRoles.includes(userRole);

    return (
      <>
        {isAllowed ? <WrappedComponent {...props} /> : <p>Unauthorized Access</p>}
      </>
    );
  };

  return WithAuthRole;
};

export default withAuthRole;
