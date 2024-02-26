import React from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Badge, Button,  } from "react-bootstrap"; // Import needed components
import { faWifi } from "@fortawesome/free-solid-svg-icons";

function DetailRoom() {
  const productData = [
    {
      id: 1,
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp",
      locationName: "Room Location",
      type: "Single Room",
      noOfRooms:2,
      bathroomType:"Attached",
      kitchenSlab:true,
      water:"BORING",
      ownerName: "Ramesh Man Singh",
      description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
      rent: 5000.0,
      wifi: false,
    }
  ];

  return (
    <Container fluid>
      <Row className="justify-content-center mb-0">
        {productData.map((product) => (
          <Col key={product.id} md={12} xl={10} className="mb-3">
            <Card className="shadow-0 border rounded-3 py-3 px-3">
                <Row>
                    <Col>
                        <CardImg src={product.image} alt={product.title} variant="top" />
                    </Col>
                    <Col>
                        <CardBody>
                            <h3>{product.locationName}</h3>
                            <h6>Type: {product.type}</h6>
                            <p><b>Owner: </b>{product.ownerName}</p>
                            <p><b>No of rooms: </b>{product.noOfRooms}</p>
                            <p><b>Bathroom Type: </b>{product.bathroomType}</p>
                            <p><b>Wifi Available: </b>{product.wifi && (<>Yes</>)}
                            {!product.wifi && (<>No</>)}
                            </p>
                            <p><b>Kitchen Slab: </b>{product.kitchenSlab && (<>Yes</>)}
                            {!product.kitchenSlab && (<>No</>)}
                            </p>

                            {/* Conditional rendering using the imported icon */}
                            {/* {product.wifi && <FontAwesomeIcon icon={faWifi} color="secondary" className="me-3" />}   */}
                            
                            <CardText className="text-muted small">

                            {product.description.slice(0, 100)}... {product.description.length > 100 && "..."}
                            </CardText>
                            
                            <div className="d-flex flex-row align-items-center mb-2">

                                <h4>Rs. <span>{product.rent}</span></h4>
                
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