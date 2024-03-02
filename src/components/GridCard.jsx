import React from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Badge, Button,  } from "react-bootstrap"; // Import needed components


const GridCard=({roomDetails, roomImages, roomLocation})=> {
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
                        <CardImg key={filteredImage.id} src={filteredImage.room_image} alt={"Room Image"} variant="top" />))}
                    </Col>
 
                     <Col>
                        <CardBody>
                          
                          {roomLocation.filter((location)=>location.room === room.id)
                                      .map((filteredLocation)=>(
                                <CardTitle key={filteredLocation.id}>Location: {filteredLocation.name}</CardTitle>
                                      ))  
                                       
                          }
                          {console.log("Location")}
                            
                         
                          
                            

                            <div className="d-flex flex-row mb-2">
                                {/* <Badge text="dark">
                                    {product.rating} <i class="bi bi-file-earmark-person-fill"></i>
                                </Badge> */}
                                <p><b>Owner: </b> </p>
                                <span className="ms-2">{room.owner_name} </span>
                            </div>
                            {/* <CardText className="text-muted small">
                            {product.description.slice(0, 100)}... {product.description.length > 100 && "..."}
                            </CardText> */}
                            <div className="d-flex flex-row mb-2">
                                <p><b>Type: </b> </p>
                                <span className="ms-2">{room.room_type} </span>
                            </div>
                            <div className="d-flex flex-row mb-2">   
                              <p><b>Number of Rooms: </b> </p>
                                <span className="ms-2">{room.no_of_room} </span>
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
                                <Button variant="outline-primary" size="sm" className="mt-2">
                                    Book Room
                                </Button>
                            </div>
                    </Col>
                </Row>
              

              
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default GridCard;