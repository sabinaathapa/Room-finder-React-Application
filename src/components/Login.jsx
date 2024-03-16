import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getAccessToken } from "./authUtils";
import styled from 'styled-components';

const StyledContainer = styled(Container)`
//   background-color: rgba(44, 51, 51,0.8);
  color: rgb(203, 228, 222);

  h3, p, h5, .labels{
    color: rgb(46, 79, 79);
  }
   
;
  `
  

const StyledButton = styled(Button)`
  background-color: rgb(14, 131, 136);
  border-color: rgb(14, 131, 136);
  color: rgb(203, 228, 222);

  &:hover {
    background-color: rgb(46, 79, 79);
    border-color: rgb(46, 79, 79);
    color: rgb(203, 228, 222);
  }
`;

const StyledForm = styled(Form)`
  .form-control {
    background-color: rgb(46, 79, 79);
    color: rgb(203, 228, 222);
    border-color: rgb(14, 131, 136);
  }

  .form-control::placeholder {
    color: rgb(203, 228, 222);
    opacity: 0.6;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState(null);

  const fetchUserRole = async () => {
    try {
      const acccessToken = getAccessToken();
      const response = await axios.get('http://localhost:8000/api/v1/accounts/get-user-role/', {
        headers: {
          Authorization: `Bearer ${acccessToken}`,
        },
      });
      setUserRole(response.data.role);
    } catch (error) {
      console.log('Error fetching user role', error);
    }
  };

  const { setAuthenticated } = useAuth();
  console.log(setAuthenticated)
  const navigate = useNavigate();

  const TenantRegister = () => {
    navigate('/tenant-registration');
  }

  const OwnerRegister = () => {
    navigate('/owner-registration');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/accounts/login/', {
        username,
        password,
      })

      Cookies.set('access_token', response.data.data.access_token);
      Cookies.set('refresh_token', response.data.data.refresh_token);

      setUsername('');
      setPassword('');
      setAuthenticated(true);

      if (response.data.data.userRole === "Owner") {
        navigate("/owner-page")
      } else {
        navigate('/#roomSearchBar');
      }

    } catch (error) {
      alert('Username or password incorrect');
    }
  };

  return (
    <StyledContainer className="my-5">
      <Row>
        <Col>
          <br />
          <h3>New Here</h3>
          <p>
            Create an account to unleash the full potential.
          </p>
          <br />
          <h5>Are you looking for a room?</h5>
          <StyledButton variant="outline-primary" onClick={TenantRegister}> Sign Up as Tenant</StyledButton>
          <br /> <br />
          <h5>Are you looking giving your room on rent?</h5>
          <StyledButton variant="outline-primary" onClick={OwnerRegister}> Sign Up as Owner</StyledButton>
        </Col>
        <Col>
        <h3>Already have an account?</h3>
          <StyledForm onSubmit={handleSubmit}>
            <Form.Group className="labels mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><b>Username</b></Form.Label>
              <Form.Control type="text" placeholder="Enter your username..." value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </Form.Group>

            <Form.Group className="labels mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label><b>Password</b></Form.Label>
              <Form.Control type="password" placeholder="Enter your password..." value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </Form.Group>

            <StyledButton variant="secondary" type="submit">Login</StyledButton>
          </StyledForm>
        </Col>
      </Row>
    </StyledContainer>
  )
}
export default Login;