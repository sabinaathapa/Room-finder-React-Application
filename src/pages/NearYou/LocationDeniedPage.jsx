import React from "react";
import { Link } from "react-router-dom";

const LocationDeniedPage = () => {
  return (
    <div className="text-center">
      <h1>Oops!</h1>
      <p>You did not allow access to your location.</p>
      <Link to='/'>Back to Home Page</Link>
    </div>
  );
};

export default LocationDeniedPage;
