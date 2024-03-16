import React, { useState } from "react";
import axios from 'axios';
import { Form, Button , Row, Container, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OwnerRegistration=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [verification, setVerification] = useState(false);
    const navigate = useNavigate();

    
    const handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8000/api/v1/accounts/register-owner/',{
            username,
            password,
            firstName,
            lastName,
            email,
            address,
            phone,
            verification,
        })
        alert('Succesfully registered Owner');
        navigate('/login');
        }catch{
            alert('Error in registering Owner.')
        }
    };

    return(
        <Container className="my-5">
            <Col>
                <Row>
                    <h3>Registration For Owners</h3>
                    <p>Fill the form below to start renting rooms. </p>
                    <br />
                    <h5>Put room on rent, Choose your ideal tenants</h5>
                    <br /><br /><br />
                    <h4>Registration Form</h4>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGridUsername1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control required type="text" placeholder="Enter your username..." value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                    </Form.Group>


                    
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter your first name..." value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" placeholder="Enter your last name..." value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
                        </Form.Group>
                    </Row>

                    
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Enter your email..." value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type="password" placeholder="Enter your password..." value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        </Form.Group>
                    </Row>


                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control required type="text" placeholder="Enter you address..." value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridAddress2">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control required type="number" placeholder="Enter your valid phone number..." value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                    </Form.Group>

                

                    <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check required type="checkbox" label="I agree terms and conditions"/>
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            </Col>
        </Container>
        // <React.Fragment>
        //     <h1>Owner Registration</h1>
        //     <label>Username
        //     <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        //     </label><br/>

        //     <label>Password
        //     <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        //     </label><br/>

        //     <label>First Name 
        //     <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
        //     </label><br/>

        //     <label>Last Name
        //     <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
        //     </label><br/>

        //     <label>Email 
        //     <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        //     </label><br/>

        //     <label>Address 
        //     <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        //     </label><br/>

        //     <label>Phone
        //     <input type="number" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
        //     </label><br/>

        //     <label>Verification
        //     <input type="checkbox" checked={verification} onChange={(e)=>{setVerification(!verification)}}/>
        //     </label><br/>

        //     <button onClick={handleSubmit}>Register</button>
        // </React.Fragment>
    )

};
export default OwnerRegistration;