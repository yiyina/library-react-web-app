import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // 不再需要 withRouter
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      hasAccount: false // 默认没有已有账号
    };
  }

  handleRegister = () => {
    const { username, password } = this.state;
    console.log('Register:', username, password);
    // 在实际项目中，可以在这里调用注册API等等
    this.setState({ isLoggedIn: true });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleToggleAccount = () => {
    this.setState((prevState) => ({
      hasAccount: !prevState.hasAccount
    }));
  };

  render() {
    const { isLoggedIn, username, password, hasAccount } = this.state;

    if (isLoggedIn) {
      return null; // 已登录，不显示注册内容
    }

    return (
      <div className="register-container">
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Button variant="success" onClick={this.handleRegister}>
            Register
          </Button>
        </Form>

        <p>Already have an account? <Link to="/login" onClick={this.handleToggleAccount}>Login</Link></p>
      </div>
    );
  }
}

export default Register;
