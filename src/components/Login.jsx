import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Form, Button , Row, Container, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const TenantRegister = () => {
      navigate('/tenant-registration');
    }

    const OwnerRegister = () => {
        navigate('/owner-registration');
      }
     
    const handleSubmit= async(e)=>{
        e.preventDefault();
          
        try{
            const response = await axios.post('http://localhost:8000/api/v1/accounts/login/',{
                username,
                password,
            })

            Cookies.set('access_token', response.data.data.access_token);
            Cookies.set('refresh_token', response.data.data.refresh_token);

            setUsername('');
            setPassword('');

            alert("Login successful");
        }catch(error){
            alert('Username or password incorrect');
        }
    };


    return(
        <Container className="my-5">
            <Row>
                <Col>
                    <br />
                    <h3>New Here</h3>
                    <p>
                        Create an account to unleash the full potential.
                    </p>
                    <br />
                    <h5>Are you looking for a room?</h5>
                    <Button variant="outline-primary" onClick={TenantRegister}> Sign Up as Tenant</Button>
                    <br /> <br />
                    <h5>Are you looking giving your room on rent?</h5>
                    <Button variant="outline-primary" onClick={OwnerRegister}> Sign Up as Owner</Button>
                </Col>
                <Col >
                {/* <br /> */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter your username..." value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password..." value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        </Form.Group>

                        <Button variant="secondary" type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
            
        </Container>
    )
}
export default Login;