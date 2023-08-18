import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerThunk, loginThunk } from '../../services/auth-thunks.js';
import avatar1 from '../../images/random-avatar/avatar1.jpg';
import avatar2 from '../../images/random-avatar/avatar2.jpg';
import avatar3 from '../../images/random-avatar/avatar3.jpg';
import avatar4 from '../../images/random-avatar/avatar4.jpg';
import avatar5 from '../../images/random-avatar/avatar5.jpg';
import avatar6 from '../../images/random-avatar/avatar6.jpg';
import avatar7 from '../../images/random-avatar/avatar7.jpg';
import avatar8 from '../../images/random-avatar/avatar8.jpg';
import avatar9 from '../../images/random-avatar/avatar9.jpg';

import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [inputError, setInputError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!username || !password) {
        setInputError("All fields are required.");
        return;
      }
      const randomIndex = Math.floor(Math.random() * avatars.length);
      const selectedAvatar = avatars[randomIndex];

      const result = await dispatch(registerThunk({ username, password, email, avatarUrl: selectedAvatar }));

      if (registerThunk.fulfilled.match(result)) {
        const loginResult = await dispatch(loginThunk({ username, password }));
        if (loginThunk.fulfilled.match(loginResult)) {
          navigate('/users/profile');
        }
      } else if (registerThunk.rejected.match(result)) {
        const message = result.error.message || "Username or password is incorrect.";
        setRegistrationError(message);
      }
    } catch (error) {
      setRegistrationError("An error occurred during registration. Please try again later.");
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
            onChange={(event) => { setEmail(event.target.value); }}
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
