import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = ({ show, handleClose, setUser }) => { // Added setUser prop for global state management
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formData.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          'https://warriorsfootballassociation-api.onrender.com/api/v1/users/login',
          {
            username: formData.username,
            password: formData.password,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const userData = {
          name: response.data.username,  // Assuming response includes username
          role: response.data.role,      // Assuming response includes role
        };

        // Set cookie for user with 1-day expiration
        Cookies.set('user', JSON.stringify(userData), { expires: 1 });
        setSuccess('Logged In successfully!');
        // Update global user state via setUser function
        setUser(userData);
        setFormData({ username: '', password: '' });
        setErrors({});
        setLoginError('');
        navigate("/");
        handleClose();
      } catch (error) {
        console.error('Error Logging In', error);
        if (error.response && error.response.data) {
          setLoginError(error.response.data.message); // Set error message from response
        } else {
          setLoginError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitted && (errors.username || errors.password) && (
          <Alert variant="danger">
            Please fix the following errors before submitting:
            <ul>
              {errors.username && <li>{errors.username}</li>}
              {errors.password && <li>{errors.password}</li>}
            </ul>
          </Alert>
        )}
        {loginError && <Alert variant="danger">{loginError}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
