// Admin.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import withAuthRole from '../utils/withAuthRole';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await firestore.collection('users').get();
        const fetchedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const changeUserRole = async (userId, newRole) => {
    try {
      await firestore.collection('users').doc(userId).update({ role: newRole });
      // Update state or display a success message
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await firestore.collection('users').doc(userId).delete();
      setUsers(users.filter(user => user.id !== userId));
      // Display a success message
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email} - Role: {user.role}
            {user.role !== 'admin' && (
              <>
                <select value={user.role} onChange={(e) => changeUserRole(user.id, e.target.value)}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuthRole(['admin'])(Admin);
