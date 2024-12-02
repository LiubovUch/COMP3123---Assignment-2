import React, { useState } from 'react';
import { addEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee({
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        salary: parseFloat(salary),
        date_of_joining: dateOfJoining,
        department: department,
      });
      navigate('/employees');
    } catch (err) {
      setError('Failed to add employee!');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Joining"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
