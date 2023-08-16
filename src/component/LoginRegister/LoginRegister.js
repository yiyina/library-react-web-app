import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './LoginRegister.css';

class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showModal: false,
      username: '',
      password: '',
      isLoginMode: true // 默认显示登录模式
    };
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleToggleMode = () => {
    this.setState((prevState) => ({
      isLoginMode: !prevState.isLoginMode,
      username: '',
      password: ''
    }));
  };

  handleLogin = () => {
    const { username, password } = this.state;
    console.log('Login:', username, password);
    this.setState({ isLoggedIn: true });
    this.handleCloseModal();
  };

  handleRegister = () => {
    const { username, password } = this.state;
    console.log('Register:', username, password);
    this.setState({ isLoggedIn: true });
    this.handleCloseModal();
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isLoggedIn, showModal, username, password, isLoginMode } = this.state;

    return (
      <div className="login-container">
        {isLoggedIn ? null : (
          <div>
            <Button variant="primary" onClick={this.handleShowModal}>
              <i className="bi bi-box-arrow-in-right"></i> Login
            </Button>
          </div>
        )}

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isLoginMode ? 'Login' : 'Register'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="link" onClick={this.handleToggleMode}>
              {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
            </Button>
            <Button
              variant={isLoginMode ? 'primary' : 'success'}
              onClick={isLoginMode ? this.handleLogin : this.handleRegister}
            >
              {isLoginMode ? 'Login' : 'Register'}
            </Button>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LoginRegister;
