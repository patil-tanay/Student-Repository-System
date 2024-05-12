// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './components/sprofile';
import Admin from './pages/Admin';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AuthProvider from './pages/AuthProvider';
// import ci from './components/ci';
// import achievement from './components/AchievementsPage';
const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/faculty" element={<FacultyDashboard />}></Route>
        <Route path="/StudentDashboard" element={<StudentDashboard />}></Route>
        {/* <Route path="/ci" element={<ci />}></Route> */}
        
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
