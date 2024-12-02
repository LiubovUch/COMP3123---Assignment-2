import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeDetail from './components/EmployeeDetail';
import Navbar from './components/Navbar'; 

function App() {
  return (
    <Router>
      <Navbar /> {}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employee/add" element={<AddEmployee />} />
        <Route path="/employee/update/:id" element={<UpdateEmployee />} />
        <Route path="/employee/:id" element={<EmployeeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
