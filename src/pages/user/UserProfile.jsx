import React from "react";
import HeaderCommon from "../../components/HeaderFooter/Header";
import Footer from "../../components/headerfooter/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProfilePicture from "../../components/ProfilePicture";
import { getAccessToken } from "../../components/authUtils";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

// const userData = [{
//     "username" : "Sabina Thapa", 
//     "email":"sabinathapa722@gmail.com",
//     "address":"manamaiju, KTM",
//     "phone":"9868732517"
// }]



const documentUploaded = false;
const accessToken = getAccessToken();


const UserProfile = ()=>{
    const [userData, setUserData] = useState([]);

    const fetchUserDetails = async () => {
        try {
            console.log("Fetching User Details From Backedn. ");
    
    
            const response = await axios.get(
                "http://localhost:8000/api/v1/myapp/get-user-details/",
                {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "multipart/form-data",
                    },
                });
    
                console.log("API Response:", response.data); // Log the response data
    
                setUserData(response.data);
    
        } catch (error) {
            console.log('Error fetching rooms', error);
        }
    };
    
    useEffect(() => {
        fetchUserDetails(); // Call the API when the component mounts
      }, []);

    return <>
        <HeaderCommon/>


            <Container className="fluid my-5">
                <Row>
                    <h3>User Profile</h3>
                </Row>

                <Row className="my-2">
                    <Col>
                    {/* <img src="https://via.placeholder.com/150" alt="" /> */}
                    <img src={`http://localhost:8000${userData.image}`} alt="" style={{ width: '30%' }} />

                        <ProfilePicture/>
                        
                    </Col>
                    <Col>
                        <Row><h4>Your Details</h4>
                     
                            <>
                                <h5><b>Username:</b> <span>{userData.username}</span></h5>
                                <h5><b>Phone:</b> <span>{userData.phone}</span></h5>
                                <h5><b>Email:</b> <span>{userData.email}</span></h5>
                                <h5><b>Address:</b> <span>{userData.address}</span></h5>
                            </>
                            </Row>
                        <Row className="my-4">
                            <h4>Change your password</h4>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>New Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter your new password..." required/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label><b>Confirm Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Renter your password..." required/>
                            </Form.Group>
                            <Button type="submit" variant="outline-primary">Change Password</Button>
                            </Form>
                        </Row>
             
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