import React from "react";
import OwnerHeader from "../../components/headerfooter/OwnerHeader";
import Footer from "../../components/headerfooter/Footer";
import { Container , Row, Table, Col, Button} from "react-bootstrap";

const CreatedRooms = ()=>{

    const bookedRoom = [
        {
          id: 1,
          image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp",
          locationName: "Room Location",
          type: "Single Room",
          coordinates: "27.123, 85.321",
          noOfRooms:2,
          bathroomType:"Attached",
          kitchenSlab:true,
          water:"BORING",
          ownerName: "Ramesh Man Singh",
          description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
          rent: 5000.0,
          wifi: false,
          status: "PENDING"
        },
        {
            id: 1,
            image: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp",
            locationName: "Room Location",
            type: "Single Room",
            coordinates: "27.123, 85.321",
            noOfRooms:2,
            bathroomType:"Attached",
            kitchenSlab:true,
            water:"BORING",
            ownerName: "Ramesh Man Singh",
            description: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
            rent: 5000.0,
            wifi: false,
            status: "ACCEPTED"
          }
      ];

    let counterIndex=0;

    return <>
        <OwnerHeader/>
            
            <Container className="fluid my-5">
                <Row>
                    <h2>Your Rooms</h2>
                    <p>Below are the rooms that you've created: </p>
                </Row>

                <Row>
            
                    <Table responsive="sm" className="my-5">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Location Name</th>
                            <th>Co-Ordinates</th>
                            <th>Room Type</th>
                            <th>No. Of Rooms</th>
                            <th>Bathroom Type</th>
                            <th>Kitchen Slab</th>
                            <th>Wifi</th>
                            <th>Water</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {bookedRoom.map((each)=>(
                                <tr>
                                    <td>{++counterIndex}</td>
                                    <td><img src="https://via.placeholder.com/150" alt="" /></td>
                                    <td>{each.locationName}</td>
                                    <td>{each.coordinates}</td>
                                    <td>{each.type}</td>
                                    <td>{each.noOfRooms}</td>
                                    <td>{each.bathroomType}</td>
                                    <td>{each.kitchenSlab ? "Available" : "No"}</td>
                                    <td>{each.wifi ? "Available" : "No"}</td>
                                    <td>{each.water}</td>
                                    <td>
                                    <Button variant="outline-success" className="mx-2"> Update  </Button>
                                           <Button variant="outline-danger">
                                           Delete 
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        <Footer/>
    </>
}
export default CreatedRooms;