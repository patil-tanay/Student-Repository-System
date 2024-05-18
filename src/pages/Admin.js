import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import '../style/Admin.css';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = firestore.collection('users');
        const snapshot = await usersRef.get();
        const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await firestore.collection('users').doc(userId).delete();
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };
  
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button className="button-primary" onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td> {/* Ensure 'email' field is correctly fetched */}
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
