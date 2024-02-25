import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Form, Button } from "react-bootstrap";

const Login=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
     
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
        <React.Fragment>

        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onSubmit={handleSubmit}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onSubmit={handleSubmit}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            </Form.Group>

            <Button variant="outline-info" type="submit">Login</Button>
    
            </Form>
        </React.Fragment>
    )
}
export default Login;