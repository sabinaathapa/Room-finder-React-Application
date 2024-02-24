import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </label><br/>

                <label>
                    Password
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </label><br/>

                <button type="submit">Login</button>
            </form>
        </React.Fragment>
    )
}
export default Login;