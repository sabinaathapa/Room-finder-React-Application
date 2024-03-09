import React from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Modal,Form, Badge, Button,  } from "react-bootstrap"; // Import needed components
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "./authUtils";


const SearchGridCard=()=> {
  const [searchLat, setSearchLat] = useState(0);
  const [searchLong, setSearchLong] = useState(0);
  const [displayName, setDisplayName] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [expectedDate, setExpectedDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [showModal, setShowModal] = useState(false);


  //Get values of search data from local storage
  const searchLocationName = localStorage.getItem("searchLocationName");
  const searchRadius = localStorage.getItem("searchRadius");

  const navigate = useNavigate();

  console.log(searchLocationName);
  console.log(searchRadius);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchLocationName},Nepal&format=json`);
        const data = await response.json();

        if (data.length > 0) {
          setSearchLat(data[0].lat);
          setSearchLong(data[0].lon);
          setDisplayName(data[0].display_name);
        }

        console.log("Data receiveed: ", searchLat,searchLong, displayName);

        const apiResponse = await axios.get('http://localhost:8000/api/v1/myapp/search_location/', {
          params: {
            lat: searchLat,
            lon: searchLong,
            search_radius: searchRadius
          },
        });

        setSearchResult(apiResponse.data);

        console.log('Search Radius', apiResponse.data);

      } catch (error) {
        console.log('Error in sending data.'), error;
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [navigate, searchLocationName, searchLat, searchLong, searchRadius, displayName]);

const handleBookNowClick = (roomId, roomOwner) => {
    setShowModal(true);
    setRoomId( roomId);
    setOwnerId( roomOwner);

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveBookingRequest = async() => {
  

    const accessToken = getAccessToken();

    try{
      const formData = new FormData();
      formData.append('room_id', roomId),
      formData.append('owner_id', ownerId),
      formData.append('rented_date', expectedDate),
      formData.append('remarks', remarks);
       

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
  return (
    <Container className="fluid">
        <Row className="mx-5">
          <Col>
              <p><b>Proximity: </b> {searchRadius} KM</p>
              <p><b>Entered Location: </b> {searchLocationName}</p>
          </Col>
          
          <Col>
              <p><b>Display Name: </b> {displayName}</p>
          </Col>
        </Row>

      <Row className="justify-content-center mb-0 my-5">

      {(searchResult ===null)?

          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
    
      :searchResult.map((room) => (
          <Col key={room.roomId} md={12} xl={10} className="mb-3">
            <Card className="shadow-0 border rounded-3 py-3 px-3">
                <Row>
                    {/* Image Link */}
                    <Col>
                        <CardImg key="room" src="" alt={"Room Image"} variant="top" />
                    </Col>
 
                     <Col>
                        <CardBody>
            
                                <CardTitle key={room.roomId}>Location: {room.locationName}</CardTitle>
                            
                            <div className="d-flex flex-row mb-2">
                                {/* <Badge text="dark">
                                    {product.rating} <i class="bi bi-file-earmark-person-fill"></i>
                                </Badge> */}
                                <p><b>Owner: </b> </p>
                                <span className="ms-2">{room.locationName} </span>
                            </div>
                            {/* <CardText className="text-muted small">
                            {product.description.slice(0, 100)}... {product.description.length > 100 && "..."}
                            </CardText> */}
                            <div className="d-flex flex-row mb-2">
                                <p><b>Type: </b> </p>
                                <span className="ms-2">{room.roomType} </span>
                            </div>
                            <div className="d-flex flex-row mb-2">   
                              <p><b>Number of Rooms: </b> </p>
                                <span className="ms-2">{room.noOfRooms} </span>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-2">
                                <h5> Rs. <span>{room.rent}</span></h5>
                            </div>
                        </CardBody>
                    </Col>
                        <Col>
                            <div className="d-flex flex-column mt-4">
                                <Button variant="primary" size="sm">
                                    Details
                                </Button>
                                <Button variant="outline-primary" size="sm" className="mt-2"onClick={()=>handleBookNowClick(room.roomId, room.roomOwner)}>
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
          <Button variant="outline-primary" onClick={() => handleSaveBookingRequest()}>
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SearchGridCard;