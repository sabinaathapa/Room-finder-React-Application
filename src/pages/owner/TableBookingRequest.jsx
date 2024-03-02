
import React from "react";
import { Container , Row, Table, Col, Button} from "react-bootstrap";

const BookingRequestTable = ()=>{

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

    return <Table responsive="sm" className="my-5">
    <thead>
    <tr>
        <th>#</th>
        <th>Room Details: </th>
        <th>Requested By</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
        {bookedRoom.map((each)=>(
            <tr>
                <td>{++counterIndex}</td>
                {/* ROom Details */}
                <td>
                    <p><b>Location Name: </b> {each.locationName}</p>
                    <p><b>Coordinates: </b>{each.coordinates}</p>
                    <p><b>Type: </b>{each.type}</p>
                    <p><b>No. Of Rooms: </b>{each.noOfRooms}</p>
                    <p><b>Bathroom Type: </b>{each.bathroomType}</p>
                    <p><b>Kitchen Slab: </b>{each.kitchenSlab ? "Available" : "No"}</p>
                    <p><b>Wifi: </b>{each.wifi ? "Available" : "No"}</p>
                    <p><b>Water: </b>{each.water}</p>
                </td>

                {/* User Details */}
                <td>
                    <p><b>Name: </b>{each.locationName}</p>
                    <p><b>Email: </b>{each.coordinates}</p>
                    <p><b>Phone: </b>{each.type}</p>
                    <p>{each.noOfRooms}</p>
                    <p>{each.bathroomType}</p>
                    <p>{each.kitchenSlab ? "Available" : "No"}</p>
                    <p>{each.wifi ? "Available" : "No"}</p>
                    <p>{each.water}</p>
                </td>


                <td>{each.status}</td>
                <td>
                    {(each.status!=="PENDING"? "No actions can be performed."
                    : <>
                        <Button variant="outline-success" className="mx-2"> Accept  </Button>
                        <Button variant="outline-danger">
                        Reject
                    </Button>
                    </>)}
                </td>
            </tr>
        ))}
    </tbody>
</Table>
}
export default BookingRequestTable;




