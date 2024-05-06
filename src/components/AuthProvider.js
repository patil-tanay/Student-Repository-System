import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function AuthProvider({ children }) {
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        history.push('/login');
      }
    });

    return () => unsubscribe();
  }, [history]);

  return <>{children}</>;
}

export default AuthProvider;
