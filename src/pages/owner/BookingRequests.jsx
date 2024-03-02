import React from "react";
import OwnerHeader from "../../components/headerfooter/OwnerHeader";
import Footer from "../../components/headerfooter/Footer";
import BookingRequestTable from "./TableBookingRequest";
import { Container , Row, Table, Col, Button, Tab, Tabs} from "react-bootstrap";

const BookingRequest = ()=>{



    return <>
        <OwnerHeader/>
            
            <Container className="fluid my-5">
                <Row>
                    <h2>Booking Requests</h2>
                    <p> Below are the booking request for your rooms: </p>
                </Row>

                <Row>
                    <Tabs
                        defaultActiveKey="pending"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                        >
                            <Tab eventKey="pending" title="Pending">
                                Tab content for Peng
                                <BookingRequestTable/>
                            </Tab>
                            <Tab eventKey="accepted" title="Accepted">
                                Tab content for Accepted
                                <BookingRequestTable/>
                            </Tab>
                            <Tab eventKey="rejected" title="Rejected">
                                Tab content for Rejected
                                <BookingRequestTable/>
                            </Tab>

                    </Tabs>

                    
                </Row>
            </Container>
        <Footer/>
    </>
}
export default BookingRequest;