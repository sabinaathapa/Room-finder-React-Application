import React, { useState } from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { getAccessToken} from "./authUtils";

const GridCard = ({ roomDetails, roomImages, roomLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [expectedDate, setExpectedDate] = useState('');

  console.log(roomDetails)

  const handleBookNowClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveBookingRequest = (roomId, ownerId, expectedDate, remarks) => {
    // Add logic for handling details click
      console.log(roomId, ownerId, expectedDate, remarks);
      setShowModal(false);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mb-0">
        {roomDetails.map((room) => (
          <Col key={room.id} md={12} xl={10} className="mb-3">
            <Card className="shadow-0 border rounded-3 py-3 px-3">
              <Row>
                {/* Image Link */}
                <Col>
                  {roomImages
                    .filter((image) => image.room_id === room.id)
                    .map((filteredImage) => (
                      <CardImg key={filteredImage.id} src={filteredImage.room_image} alt={"Room Image"} variant="top" />
                    ))}
                </Col>

                <Col>
                  <CardBody>
                    {roomLocation
                      .filter((location) => location.room === room.id)
                      .map((filteredLocation) => (
                        <CardTitle key={filteredLocation.id}>Location: {filteredLocation.name}</CardTitle>
                      ))}
                    {console.log("Location")}

                    <div className="d-flex flex-row mb-2">
                      <p>
                        <b>Owner: </b>{" "}
                      </p>
                      <span className="ms-2">{room.owner_name} </span>
                    </div>
                    <div className="d-flex flex-row mb-2">
                      <p>
                        <b>Type: </b>{" "}
                      </p>
                      <span className="ms-2">{room.room_type} </span>
                    </div>
                    <div className="d-flex flex-row mb-2">
                      <p>
                        <b>Number of Rooms: </b>{" "}
                      </p>
                      <span className="ms-2">{room.no_of_room} </span>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-2">
                      <h5>
                        {" "}
                        Rs. <span>{room.rent}</span>
                      </h5>
                    </div>
                  </CardBody>
                </Col>
                <Col>
                  <div className="d-flex flex-column mt-4">
                    <Button variant="primary" size="sm">
                      Details
                    </Button>
                    <Button variant="outline-primary" size="sm" className="mt-2" onClick={handleBookNowClick}>
                      Book Room
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for booking */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expected Date: </Form.Label>
              <Form.Control type="date" placeholder="Enter expected start date: " 
              required
              value={expectedDate} onChange={(e)=>{setExpectedDate(e.target.value)}} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Remarks:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter remarks"
                value={remarks} onChange={(e)=>{setRemarks(e.target.value)}} 
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={() => handleSaveBookingRequest(roomDetails.id, roomDetails.ownerId, expectedDate, remarks)}>
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GridCard;
