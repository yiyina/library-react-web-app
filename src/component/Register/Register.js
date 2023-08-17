import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../services/auth-thunks.js'; // 根据实际路径修改
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [inputError, setInputError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!username || !password) {
        setInputError("All fields are required.");;
        return;
      }

      const result = await dispatch(registerThunk({ username, password, email }));

      if (registerThunk.fulfilled.match(result)) {
        navigate('/users/profile');
      } else if (registerThunk.rejected.match(result)) {
        setRegistrationError(result.error.message);
      }
    } catch (e) {
      alert(e); 
    }
  };

  return (
    <div className="register-container">
      <Form>
        {inputError && <Alert variant="danger">{inputError}</Alert>}
        {registrationError && <Alert variant="danger">{registrationError}</Alert>}
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(event) => {setEmail(event.target.value);}}
          />
          {emailError && <Alert variant="danger">{emailError}</Alert>}
        </Form.Group>

        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Form>

      <p>Already have an account? <Link to="/users/login">Login</Link></p>
    </div>
  );
};

export default Register;
