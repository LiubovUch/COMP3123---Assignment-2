import React, { useState, useEffect } from 'react';
import { getEmployee, updateEmployee } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom'; 

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({ name: '', position: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { id } = useParams(); 

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await getEmployee(id);
      setEmployee(response.data);
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(id, employee);
      navigate('/employees'); 
    } catch (err) {
      setError('Failed to update employee!');
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Employee Position"
          value={employee.position}
          onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
        />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
