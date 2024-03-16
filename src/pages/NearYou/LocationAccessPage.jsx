import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardImg, CardBody, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from "../../components/authUtils";
import { useAuth } from "../../components/AuthContext";
import HeaderCommon from "../../components/HeaderFooter/Header";
import Footer from "../../components/headerfooter/Footer";

const LocationAccess = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [offeredRent, setOfferedRent] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { latitude, longitude } = location.state || {};
  const { authenticated } = useAuth();
  useEffect(() => {
    console.log("Latitude", latitude);
    console.log("Longitude", longitude);
    const fetchData = async () => {
      try {
        const apiResponse = await axios.get('http://localhost:8000/api/v1/myapp/search_location/', {
          params: {
            lat: latitude,
            lon: longitude,
            search_radius: 10
          },
        });

        setSearchResult(apiResponse.data);

      } catch (error) {
        console.log('Error in fetching search results:', error);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  const handleBookNowClick = (roomId, roomOwner) => {
    if(!authenticated){
        alert("Please Login to proceed with booking.");
        return;
      }
    setShowModal(true);
    setRoomId(roomId);
    setOwnerId(roomOwner);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDetailsButton = (roomId) => {
    navigate(`/get-room-details/${roomId}`);
  };

  const handleSaveBookingRequest = async () => {
    const formData = new FormData();
    formData.append('room_id', roomId);
    formData.append('owner_id', ownerId);
    formData.append('rented_date', expectedDate);
    formData.append('remarks', remarks);
    formData.append('offered_rent', offeredRent);

    try {
      const accessToken = getAccessToken();
      const response = await axios.post('http://localhost:8000/api/v1/myapp/rented-room/',
        formData, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }});
      setShowModal(false);
    } catch (error) {
      console.log("Error in sending the Booking details.", error);
    }
    setExpectedDate('');
    setOfferedRent(0);
    setRemarks('');
  };

  return (
    <>
      <HeaderCommon />

      <Container className="fluid" style={{ backgroundColor: 'rgba(203, 228, 222,0.8)' }}>
        <Row className="mx-5">
          <h2 style={{ color: 'rgb(14, 131, 136)' }}>Rooms Near You</h2>
          <Col>
            <p><b>Proximity: </b>10 KM</p>
            <p><b>Latitude: </b> {latitude}</p>
            <p><b>Longitude: </b> {longitude}</p>
          </Col>
        </Row>
        <Row className="justify-content-center mb-0 my-5">
          {searchResult === null ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            searchResult.map((room) => (
              <Col key={room.roomId} md={12} xl={10} className="mb-3">
                <Card className="shadow-0 border rounded-3 py-3 px-3" style={{ backgroundColor: 'rgba(44, 51, 51,0.7)', color: 'rgb(203, 228, 222)' }}>
                  <Row>
                    <Col>
                      <CardImg key="room" src={`http://localhost:8000/media/${room.imageLink}`} alt={"Room Image"} variant="top" />
                    </Col>
                    <Col>
                      <CardBody>
                        <h5 key={room.roomId} style={{ color: 'white' }}>Location:</h5>
                        <p>{room.locationName}</p>
                        <p>
                          <b>Type: </b> <span className="ms-2">{room.roomType}</span>
                          <br />
                          <b>Number of Rooms: </b> <span className="ms-2">{room.noOfRooms}</span>
                          <br />
                          <b>Distance: </b> <span>{room.distance}</span> KM
                          <br />
                          {room.description && (
                            <div>
                              <b>Description: </b><span> {room.description}</span>
                            </div>
                          )}
                        </p>
                        <h5 style={{ color: 'white' }}> Rs. <span>{room.rent}</span></h5>
                        <p></p>
                        <div className="d-flex flex-row mb-2">
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                        </div>
                      </CardBody>
                    </Col>
                    <Col>
                      <div className="d-flex flex-column mt-4">
                        <Button variant="primary" size="sm" onClick={() => handleDetailsButton(room.roomId)} style={{ backgroundColor: 'rgb(46, 79, 79)', borderColor: 'rgb(46, 79, 79)' }}>
                          Details
                        </Button>
                        <Button variant="primary" size="sm" className="mt-2" onClick={() => handleBookNowClick(room.roomId, room.roomOwner)} style={{ backgroundColor:'rgb(46, 79, 79)', borderColor: 'rgb(46, 79, 79)' }}>
                          Book Room
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* Modal for booking */}
        <Modal show={showModal} onHide={handleCloseModal} style={{ backgroundColor: 'rgb(44, 51, 51)', color: 'rgb(203, 228, 222)' }}>
          <Modal.Header closeButton>
            <Modal.Title>Booking Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Expected Date: </Form.Label>
                <Form.Control type="date" placeholder="Enter expected start date: "
                  required
                  value={expectedDate} onChange={(e) => { setExpectedDate(e.target.value) }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Offered Rent: </Form.Label>
                <Form.Control type="number" placeholder="Enter expected start date: "
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
            <Button variant="outline-danger" onClick={handleCloseModal} style={{  color: 'rgb(46, 79, 79)', borderColor: 'rgb(46, 79, 79)' }}>
              Close
            </Button>
            <Button variant="outline-primary" onClick={handleSaveBookingRequest} style={{  color: 'rgb(46, 79, 79)', borderColor: 'rgb(46, 79, 79)' }}>
              Book Now
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default LocationAccess;