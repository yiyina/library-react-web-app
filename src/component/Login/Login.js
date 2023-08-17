import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../services/auth-thunks.js';
import './Login.css';

const Login = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);
  
  const handleLogin = async () => {
    // Clear previous errors
    setError(null);
  
    // Check for empty username or password
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }
    
    try {
      const result = await dispatch(loginThunk({ username, password }));
  
      // Check if login was successful
      if (loginThunk.fulfilled.match(result)) {
        setIsLoggedIn(true);
        navigate('/users/profile');
      } else if (loginThunk.rejected.match(result)) {
        // Check the error message returned by the server
        // and set an appropriate error message
        const message = result.error.message || "Username or password is incorrect.";
        setError(message);
      }
    } catch (error) {
      // Unexpected errors
      setError("An error occurred during login.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleToggleAccount = () => {
    setHasAccount((prevState) => !prevState);
  };

  if (isLoggedIn) {
    navigate('/users/profile');
    return null;
  }

  return (
    <div className="login-container">
      <Form>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>

      <p>
        Do not have an account? <Link to="/users/register" onClick={handleToggleAccount}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
