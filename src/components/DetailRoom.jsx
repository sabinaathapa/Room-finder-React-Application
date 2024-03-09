import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Badge, Button } from "react-bootstrap";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailRoom() {
  const { roomId } = useParams();
  console.log("ID OF ROOM", roomId);
  const [roomDetails, setRoomDetails] = useState(null);
  
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/myapp/room-details/${roomId}`);
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
        {roomDetails && Array.isArray(roomDetails) && roomDetails.map((roomDetail) => (
          <Col key={roomDetail.id} md={12} xl={10} className="mb-3">
            <Card className="shadow-0 border rounded-3 py-3 px-3">
              <Row>
                <Col>
                  <CardImg src={roomDetail.image} alt={roomDetail.title} variant="top" />
                </Col>
                <Col>
                  <CardBody>
                    <h3>{roomDetail.locationName}</h3>
                    <h6>Type: {roomDetail.type}</h6>
                    <p><b>Owner: </b>{roomDetail.ownerName}</p>
                    <p><b>No of rooms: </b>{roomDetail.noOfRooms}</p>
                    <p><b>Bathroom Type: </b>{roomDetail.bathroomType}</p>
                    <p><b>Wifi Available: </b>{roomDetail.wifi ? "Yes" : "No"}</p>
                    <p><b>Kitchen Slab: </b>{roomDetail.kitchenSlab ? "Yes" : "No"}</p>
                    <CardText className="text-muted small">
                      {roomDetail.description.slice(0, 100)}... {roomDetail.description.length > 100 && "..."}
                    </CardText>
                    <div className="d-flex flex-row align-items-center mb-2">
                      <h4>Rs. <span>{roomDetail.rent}</span></h4>
                    </div>
                    <div className="d-flex flex-column mt-4">
                      <Button variant="outline-primary" size="sm" className="mt-2">
                        Book Now
                      </Button>
                    </div>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DetailRoom;
