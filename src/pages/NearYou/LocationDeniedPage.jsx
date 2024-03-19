import React from "react";
import { Link } from "react-router-dom";
import HeaderCommon from "../../components/HeaderFooter/Header";
import Footer from "../../components/headerfooter/Footer";
import { Container, Row , Button} from "react-bootstrap";

const LocationDeniedPage = () => {
  return (
    <>
    <HeaderCommon/>
    <div className="text-center my-5">
      {/* <h1>Oops!</h1>
      <p>You did not allow access to your location.</p> */}

      <Container>
        <Row className="justify-content-center">
        <img src="src\assets\error1.gif" style={{ width: '70%' }}></img>
        </Row>
        <Row>
        <Link to='/'><Button variant="outline-primary my-2" >Go Back to Homepage</Button></Link>
      </Row>
      </Container>
      
      
   
    </div>
    <Footer/>
    </>
  );
};

export default LocationDeniedPage;
