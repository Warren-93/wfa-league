import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrors] = useState('');
  const [successMessage, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors(''); // Clear any previous error message when the user changes input
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!formData.username) {
      setErrors('Username is required.');
      return false;
    }

    if (!formData.password) {
      setErrors('Password is required.');
      return false;
    }

    if (!passwordRegex.test(formData.password)) {
      setErrors('Password must be at least 12 characters long, include at least one number, one uppercase letter, and one special character.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      axios.post('https://warriorsfootballassociation-api.onrender.com/api/v1/users/createUser', { username: formData.username, password: formData.password })
        .then(response => {
          console.log(response);
          setSuccess('Registered successfully!');
          setFormData({
            username: '',
            password: '',
            confirmPassword: '',
          });
          setErrors('');  // Ensure to reset errors as a string
        })
        .catch(error => {
          console.error('Error creating player:', error);
          const errorMsg = error.response && error.response.data && error.response.data.message 
            ? error.response.data.message 
            : error.message || 'An unknown error occurred';
          setErrors(errorMsg); // Set error message as a string
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button variant="outline-secondary" onClick={toggleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button variant="outline-secondary" onClick={toggleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
