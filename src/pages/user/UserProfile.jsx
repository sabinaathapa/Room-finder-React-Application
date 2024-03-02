import React from "react";
import HeaderCommon from "../../components/HeaderFooter/Header";
import Footer from "../../components/headerfooter/Footer";
import { Container, Row, Col } from "react-bootstrap";

const userData = [{
    "username" : "Sabina Thapa", 
    "email":"sabinathapa722@gmail.com",
    "address":"manamaiju, KTM",
    "phone":"9868732517"
}]

const documentUploaded = false;

const UserProfile = ()=>{

    return <>
        <HeaderCommon/>


            <Container className="fluid my-5">
                <Row>
                    <h3>User Profile</h3>
                </Row>

                <Row className="my-2">
                    <Col>
                        <img src="https://via.placeholder.com/150" alt="" />
                    </Col>
                    <Col>
                        <Row><h4>Your Details</h4></Row>
                        {userData.map((each) =>(
                            <>
                                <h5><b>Username:</b> <span>{each.username}</span></h5>
                                <h5><b>Phone:</b> <span>{each.phone}</span></h5>
                                <h5><b>Email:</b> <span>{each.email}</span></h5>
                                <h5><b>Address:</b> <span>{each.address}</span></h5>
                            </>
                        ))}
                    </Col>
                </Row>
            </Container>

            <Container className="fluid my-5">
                <Row>
                    <h3>Your Documents</h3>
                    <p>Documents must be uploaded before proceeding for Room Booking.</p>
                    
                </Row>

                <Row>
                    {documentUploaded ? 
                        <>
                            <p>Below are you uploaded document: </p>
                        </>
                    : <p>Please Upload.</p>}
                </Row>
            </Container>
        <Footer/>
    </>
}
export default UserProfile;