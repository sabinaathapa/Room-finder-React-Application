import React from "react";
import { Link } from "react-router-dom";


const Home=()=>{
    return(
        <React.Fragment>
            <h1>New User?</h1>

            <h4>Sign Up as Owner</h4>
            <Link to="/owner-registration">Owner Registration</Link>

            <h4>Sign Up as Tenant</h4>
            <Link to="/tenant-registration">Tenant Registration</Link>


            <h1>Already have an account?</h1>
            <h4>Proceed To Login</h4>
            <Link to="/login">Login</Link>
            
        </React.Fragment>

    )
}
export default  Home;
