import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const handleLogin = () => {
    console.log('Login:', username, password);
    // 在实际项目中处理登录逻辑
    const loginSuccessful = true; // 假设登录成功
    if (loginSuccessful) {
      setIsLoggedIn(true);
      navigate("/profile");
    } else {
      // 处理登录失败逻辑
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
    return null; // 已登录，不显示登录内容
  }

  return (
    <div className="login-container">
      <Form>
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
        Do not have account? <Link to="/register" onClick={handleToggleAccount}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
