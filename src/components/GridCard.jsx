import React, { useState } from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "./authUtils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styled from 'styled-components';

const StyledCard = styled(Card)`
  background-color: rgba(44, 51, 51,0.85);
  color: rgb(203, 228, 222);
  border-color: rgb(46, 79, 79);

  .card-body {
    background-color: rgba(46, 79, 79,0.5);
  }
`;

const StyledButton = styled(Button)`
  background-color: rgb(14, 131, 136);
  border-color: rgb(14, 131, 136);
  color: rgb(203, 228, 222);

  &:hover {
    background-color: rgb(46, 79, 79);
    border-color: rgb(46, 79, 79);
    color: rgb(203, 228, 222);
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: rgb(44, 51, 51);
    color: rgb(203, 228, 222);
  }

  .modal-header,
  .modal-footer {
    background-color: rgb(46, 79, 79);
    border-color: rgb(46, 79, 79);
  }

  .form-control {
    background-color: rgb(46, 79, 79);
    color: rgb(203, 228, 222);
    border-color: rgb(14, 131, 136);
  }

  .form-control::placeholder {
    color: rgb(203, 228, 222);
    opacity: 0.6;
  }
`;

const GridCard = ({ roomDetails, roomImages, roomLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [offeredRent, setOfferedRent] = useState(0);

  const { authenticated } = useAuth();

  const navigate = useNavigate();

  console.log(roomDetails)

  const handleBookNowClick = () => {
    if (!authenticated) {
      alert("Please Login to proceed with booking.");
      return;
    }

    setShowModal(true);

    roomDetails.map((room) => {
      setRoomId(room.id),
        setOwnerId(room.user)
    })

  };

  const handleDetailsButton = (roomId) => {
    navigate(`/get-room-details/${roomId}`);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveBookingRequest = async () => {
    const accessToken = getAccessToken();

    try {
      const formData = new FormData();
      formData.append('room_id', roomId),
        formData.append('owner_id', ownerId),
        formData.append('rented_date', expectedDate),
        formData.append('remarks', remarks);
      formData.append('offered_rent', offeredRent);

      const response = await axios.post('http://localhost:8000/api/v1/myapp/rented-room/',
        formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      })
    } catch (error) {
      console.log("Error in sending the Booking details.")
    }
    setShowModal(false);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mb-0">
        {roomDetails.map((room) => (room.available &&
          <Col key={room.id} md={12} xl={10} className="mb-3">
            <StyledCard className="shadow-0 border rounded-3 py-3 px-3">
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
                    {room.description && (
                      <div className="d-flex flex-row mb-2">
                        <p>
                          <b>Description:</b>{" "}
                        </p>
                        <span className="ms-2">{room.description}</span>
                      </div>
                    )}

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
                    <StyledButton variant="primary" size="sm" onClick={() => handleDetailsButton(room.id)}>
                      <strong>Details</strong>
                    </StyledButton>
                    <StyledButton variant="outline-primary" size="sm" className="mt-2" onClick={handleBookNowClick}>
                      <strong>Book Room</strong>
                    </StyledButton>
                  </div>
                </Col>
              </Row>
            </StyledCard>
          </Col>
        ))}
      </Row>

      {/* Modal for booking */}
      <StyledModal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Expected Date: </Form.Label>
              <Form.Control type="date" placeholder="Enter expected start date:"
                required
                value={expectedDate} onChange={(e) => { setExpectedDate(e.target.value) }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Offered Rent: </Form.Label>
              <Form.Control type="number" placeholder="Enter offered rent:"
                required
                value={offeredRent} onChange={(e) => { setOfferedRent(e.target.value) }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Remarks:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter remarks"
                value={remarks} onChange={(e) => { setRemarks(e.target.value) }}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <StyledButton variant="outline-danger" onClick={handleCloseModal}>
            Close
          </StyledButton>
          <StyledButton variant="outline-primary" onClick={() => handleSaveBookingRequest()}>
            Book Now
          </StyledButton>
        </Modal.Footer>
      </StyledModal>
    </Container>
  );
};

export default GridCard;