import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../services/auth-thunks.js';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user.currentUser);

  const handleLogin = async () => {
    setError(null);

    // if (!username || !password) {
    //   setError("All fields are required.");
    //   return;
    // }

    try {
        const result = await dispatch(loginThunk({ username, password }));
        console.log("error message", error);
        if (loginThunk.fulfilled.match(result)) {
            navigate('/users/profile');
        } else if (loginThunk.rejected.match(result)) {
            
            const { status, error } = result.payload;
            if (status === 403) {
                setError(error.message);
            } else if (status === 401) {
                setError(error.message);
            } else {
                setError("An error occurred during login.");
            }
        }
    } catch (error) {

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
    setUsername('');
    setPassword('');
    setError(null);
  };

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
        {currentUser ? (
          <span>Logged in as {currentUser.username}</span>
        ) : (
          <>
            Do not have an account?{' '}
            <Link to="/users/register" onClick={handleToggleAccount}>
              Register
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default Login;
