import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/employees/${id}`)
      .then((response) => setEmployee(response.data))
      .catch(() => setError("Error fetching employee details."));
  }, [id]);

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Name: {employee.first_name} {employee.last_name}
          </Typography>
          <Typography variant="body1">Department: {employee.department}</Typography>
          <Typography variant="body1">Position: {employee.position}</Typography>
          <Typography variant="body1">Salary: {employee.salary}</Typography>
          <Typography variant="body1">
            Date of Joining: {new Date(employee.date_of_joining).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmployeeDetail;
