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
            {/* <th className="table-cell">ID</th> */}
            <th className="table-cell">Email</th>
            <th className="table-cell">Name</th>
            <th className="table-cell">Role</th>
            <th className="table-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              {/* <td className="table-cell">{user.id}</td> */}
              <td className="table-cell">{user.email}</td> {/* Ensure 'email' field is correctly fetched */}
              <td className="table-cell">{user.name}</td>
              <td className="table-cell">{user.role}</td>
              <td className="table-cell">
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
