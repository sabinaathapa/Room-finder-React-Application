import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Badge, Button } from "react-bootstrap";
import { faUnderline, faWifi } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Modal, Form } from "react-bootstrap";

function DetailRoom() {
  const { roomId } = useParams();
  console.log("ID OF ROOM", roomId);
  const [roomDetails, setRoomDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [offeredRent, setOfferedRent] = useState(0);


  const handleBookNowClick = () => {
    setShowModal(true);

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const handleSaveBookingRequest = async() => {
  

    const accessToken = getAccessToken();

    try{
      const formData = new FormData();
      formData.append('room_id', roomId),
      formData.append('owner_id', roomDetails.ownerId),
      formData.append('rented_date', expectedDate),
      formData.append('remarks', remarks);
      formData.append('offered_rent', offeredRent);
       

      const response = await axios.post('http://localhost:8000/api/v1/myapp/rented-room/',
      formData,{
        headers:{
          Authorization:`Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      })
    }catch(error){
      console.log("Erroe in sending the Booking details.")
    }
      setShowModal(false);
  };
  
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/myapp/room-details/?roomId=${roomId}`);
        setRoomDetails(response.data);
      } catch (error) {
        console.error("Error in fetching data.", error);
      }
    };
    fetchRoomDetails();
  }, [roomId]);

  return (
    <Container fluid>
      <Row className="justify-content-center mb-0">
          {(roomDetails === null || roomDetails === undefined)
          ? <h1>Loading Data</h1>
          :<Col key={roomDetails.roomId} md={12} xl={10} className="mb-3">
            <Card className="shadow-0 border rounded-3 py-3 px-3">
              <Row>
                <Col>
                  <CardImg src={roomDetails.imageLink} variant="top" />
                </Col>
                <Col>
                  <CardBody>
                    <h4>Location: </h4>
                    <p>{roomDetails.locationName}</p>

                    <p><b>Type: </b> {roomDetails.roomType}</p>
                    {/* <p><b>Owner: </b>{roomDetails.ownerName}</p> */}
                    <p><b>No of rooms: </b>{roomDetails.noOfRooms}</p>
                    <p><b>Bathroom Type: </b>{roomDetails.bathroomType}</p>
                    <p><b>Wifi Available: </b>{roomDetails.wifi ? "Yes" : "No"}</p>
                    <p><b>Kitchen Slab: </b>{roomDetails.kitchenSlab ? "Yes" : "No"}</p>
                    {/* <CardText className="text-muted small">
                      {roomDetails.description.slice(0, 100)}... {roomDetails.description.length > 100 && "..."}
                    </CardText> */}
                    <div className="d-flex flex-row align-items-center mb-2">
                      <h4>Rs. <span>{roomDetails.rent}</span></h4>
                    </div>
                    <div className="d-flex flex-column mt-4">
                      <Button variant="outline-primary" size="sm" className="mt-2" onClick={handleBookNowClick}>
                        Book Now
                      </Button>
                    </div>
                  </CardBody>
                </Col>
              </Row>
            </Card>
            
            <Row className="my-3">
              <h4>Location in Map: </h4>
            <MapContainer
                  center={[roomDetails.latitude, roomDetails.longitude]}
                  zoom={40}
                  style={{ height: '400px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[roomDetails.latitude, roomDetails.longitude]}>

                  </Marker>
            </MapContainer>
            </Row>
          </Col>}
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

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Offered Rent: </Form.Label>
              <Form.Control type="number" placeholder="Enter expected start date: " 
              required
              value={offeredRent} onChange={(e)=>{setOfferedRent(e.target.value)}} 
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
          <Button variant="outline-primary" onClick={() => handleSaveBookingRequest()}>
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DetailRoom;
