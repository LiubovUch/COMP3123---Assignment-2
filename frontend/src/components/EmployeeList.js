import React, { useState, useEffect } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await getEmployees();
    setEmployees(response.data);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    fetchEmployees();
  };

  const handleSearch = () => {
    const filteredEmployees = employees.filter((employee) =>
      [employee.first_name, employee.last_name, employee.department, employee.position]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setEmployees(filteredEmployees);
  };

  return (
    <div>
      <h2>Employee List</h2>
      <input
        type="text"
        placeholder="Search by name, department, or position"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>
                {employee.first_name} {employee.last_name}
              </td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/employee/${employee._id}`}>View</Link>
                <Link to={`/employee/update/${employee._id}`}>Update</Link>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/employee/add">Add Employee</Link>
    </div>
  );
};

export default EmployeeList;
