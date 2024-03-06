import React, { useState } from "react";
import OwnerHeader from "../../components/headerfooter/OwnerHeader";
import Footer from "../../components/headerfooter/Footer";
import OwnerRoom from "../../components/OwnerRoom";
import { Container, Row, Col } from "react-bootstrap";

const CreateRoomForm = ()=>{
    return <>
        <OwnerHeader/>
          <Container className="fluid my-5">
              <Row>
                <h1>Create a new room.</h1>
                <h5>You're just one step away from making your room availabe to rent.</h5>
                <p>Fill the form below and you're ready to go.</p>
              </Row>


              <Row className="my-5">
                <OwnerRoom/>
              </Row>
          </Container>
          
        <Footer/>
    </>
}

export default CreateRoomForm;
