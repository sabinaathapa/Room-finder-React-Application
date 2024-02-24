import React, { useState } from "react";
import axios from 'axios';

const TenantRegistration=()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [verification, setVerification] = useState(false);


    const handleSubmit= async()=>{
        try{
            const response = await axios.post('http://localhost:8000/api/v1/accounts/register-tenant/',{
            username,
            password,
            firstName,
            lastName,
            email,
            address,
            phone,
            verification,
        })
        alert('Succesfully registered Owner')
        
        }catch{
            alert('Error in registering Owner.')
        }
    };

    return(
        <React.Fragment>
            <h1>Tenant Registration</h1>
            <label>Username
            <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            </label><br/>

            <label>Password
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </label><br/>

            <label>First Name 
            <input type="text" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
            </label><br/>

            <label>Last Name
            <input type="text" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
            </label><br/>

            <label>Email 
            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </label><br/>

            <label>Address 
            <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
            </label><br/>

            <label>Phone
            <input type="number" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
            </label><br/>

            <label>Verification
            <input type="checkbox" value={verification} onChange={(e)=>{setVerification(!verification)}}/>
            </label><br/>

            <button onClick={handleSubmit}>Register</button>
        </React.Fragment>
    )

};
export default TenantRegistration;