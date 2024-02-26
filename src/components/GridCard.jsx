import React from "react";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Badge, Button,  } from "react-bootstrap"; // Import needed components


function GridCard() {
  const productData = [
    {
      id: 1,
      image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp",
      title: "Room Location",
      ownerName: "Ramesh Man Singh",
      description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
      rent: 5000.0,
      wifi: "Free",
    },
    {
        id: 2,
        image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp",
        title: "Room Location",
        ownerName: "Sabina Thapa",
        description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
        rent: 7000.0,
        wifi: "Free",
      }
    // ... other products
  ];

  return (
    <Container fluid>
      <Row className="justify-content-center mb-0">
        {productData.map((product) => (
          <Col key={product.id} md={12} xl={10} className="mb-3">
            <Card className="shadow-0 border rounded-3 py-3 px-3">
                <Row>
                    {/* Image Link */}
                    <Col>
                        <CardImg src={product.image} alt={product.title} variant="top" />
                    </Col>
                    {/* Dynamic Product Details. */}
                    <Col>
                        <CardBody>
                            <CardTitle>{product.title}</CardTitle>

                            <div className="d-flex flex-row mb-2">
                                {/* <Badge text="dark">
                                    {product.rating} <i class="bi bi-file-earmark-person-fill"></i>
                                </Badge> */}
                                <p><b>Owner: </b> </p>
                                <span className="ms-2">{product.ownerName} </span>
                            </div>
                            <CardText className="text-muted small">
                            {product.description.slice(0, 100)}... {product.description.length > 100 && "..."}
                            </CardText>
                            <div className="d-flex flex-row align-items-center mb-2">
                                <h5>Rs. <span>{product.rent}</span></h5>
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