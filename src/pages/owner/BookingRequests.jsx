import React from "react";
import OwnerHeader from "../../components/headerfooter/OwnerHeader";
import Footer from "../../components/headerfooter/Footer";
import BookingRequestTable from "./TableBookingRequest";
import { Container , Row, Table, Col, Button, Tab, Tabs} from "react-bootstrap";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../components/authUtils";
import axios from "axios";

const BookingRequest = ()=>{

    const [bookedRoom, setBookedRoom] = useState([]);

    const accessToken = getAccessToken();


    const fetchResult = async (status) => {
        try {
            console.log("Fetching Created Room Details From Backend. ");


            const response = await axios.get(
                "http://localhost:8000/api/v1/myapp/get-booking-request/?status="+status,
                {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "multipart/form-data",
                    },
                });

                console.log("API Response:", response.data); // Log the response data

                setBookedRoom(await response.data);

        } catch (error) {
            console.log('Error fetching rooms', error);
        }
    };

    useEffect(() => {
        fetchResult("PENDING"); // Call the API when the component mounts
      }, []); // The empty dependency array ensures this effect runs once after the initial render


      const handleTabClick = (status) => {
        console.log("Event Triggered with status: " + status);
        fetchResult(status);
      };

    return <>
        <OwnerHeader/>
            
            <Container className="fluid my-5">
                <Row>
                    <h2>Booking Requests</h2>
                    <p> Below are the booking request for your rooms: </p>
                </Row>

                <Row>
                    <Tabs
                        defaultActiveKey="PENDING"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                        onSelect={(eventKey) => handleTabClick(eventKey)}
                        >
                            <Tab eventKey="PENDING" title="Pending">
                                Below are the rooms booking requests that needs your actions: 
                                
                                {
                                (bookedRoom.length!==0)
                                ? <BookingRequestTable bookedRoom={bookedRoom}/>
                                :<h5 className="text-center my-5">No Pending Requests</h5>
                                }
                            </Tab>
                            <Tab eventKey="ACCEPTED" title="Accepted" >
                                Below are the rooms that you've rented using "Hamro Room":
                                {
                                (bookedRoom.length!==0)
                                ? <BookingRequestTable bookedRoom={bookedRoom}/>
                                :<h5 className="text-center my-5">No Accepted Requests</h5>
                                }
                            </Tab>
                            <Tab eventKey="REJECTED" title="Rejected">
                                Below are the rooms booking request that you've rejected:
                                {
                                (bookedRoom.length!==0)
                                ? <BookingRequestTable bookedRoom={bookedRoom}/>
                                :<h5 className="text-center my-5">No Rejected Requests</h5>
                                }
                            </Tab>

                    </Tabs>

                    
                </Row>
            </Container>
        <Footer/>
    </>
}
export default BookingRequest;