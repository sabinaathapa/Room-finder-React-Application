import React, { useState } from "react";
import axios from 'axios';
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  color: rgb(203, 228, 222);

  h3, h5, p, .labels, h4 {
    color: rgb(46, 79, 79);
  }
`;

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
  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    color: rgb(46, 79, 79);
  }

  .form-check-input:checked {
    background-color: rgb(14, 131, 136);
  }

  .form-check-label {
    color: rgb(203, 228, 222);
  }
`;

const OwnerRegistration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [verification, setVerification] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/accounts/register-owner/', {
                username,
                password,
                firstName,
                lastName,
                email,
                address,
                phone,
                verification,
            });
            alert('Successfully registered Owner');
            navigate('/login');
        } catch {
            alert('Error in registering Owner.');
        }
    };

    return (
        <StyledContainer className="my-5">
            <Col>
                <Row>
                    <h3>Registration For Owners</h3>
                    <p>Fill the form below to start renting rooms.</p>
                    <br />
                    <h5>Put room on rent, Choose your ideal tenants</h5>
                    <br /><br /><br />
                    <h4>Registration Form</h4>
                </Row>
                <StyledForm onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={6}>
                            <Form.Group className="labels mb-3" controlId="formGridUsername1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Form.Group className="labels mb-3" controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your first name..." value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="labels mb-3" controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter your last name..." value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Form.Group className="labels mb-3" controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="labels mb-3" controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Form.Group className="labels mb-3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control required type="text" placeholder="Enter you address..." value={address} onChange={(e) => setAddress(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="labels mb-3" controlId="formGridAddress2">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control required type="number" placeholder="Enter your valid phone number..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="labels mb-3" id="formGridCheckbox">
                        <Form.Check required type="checkbox"label={<span style={{ color: 'black' }}>I agree terms and conditions.</span>}  />
                    </Form.Group>

                    <StyledButton variant="primary" type="submit">
                        Submit
                    </StyledButton>
                </StyledForm>
            </Col>
        </StyledContainer>
    );
};

export default OwnerRegistration;
