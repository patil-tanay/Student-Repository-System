// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/sprofile';
import Admin from './components/Admin';
import FacultyDashboard from './components/FacultyDashboard';
import EducationForm from './components/EducationForm';
import StudentDashboard from './components/StudentDashboard';
// import achievement from './components/AchievementsPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/education" element={<EducationForm />}></Route>
        <Route path="/faculty" element={<FacultyDashboard />}></Route>
        <Route path="/StudentDashboard" element={<StudentDashboard />}></Route>
        
      </Routes>
    </Router>
  );
};

export default App;
