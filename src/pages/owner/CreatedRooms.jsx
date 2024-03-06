import React from "react";
import OwnerHeader from "../../components/headerfooter/OwnerHeader";
import Footer from "../../components/headerfooter/Footer";
import { Container , Row, Table, Col, Button} from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "../../components/authUtils";
import { useState, useEffect } from "react";


const CreatedRooms = ()=>{
    const [bookedRoom, setBookedRoom] = useState([]);

    const accessToken = getAccessToken();


    const fetchResult = async () => {
        try {
            console.log("Fetching Created Room Details From Backend. ");


            const response = await axios.get(
                "http://localhost:8000/api/v1/myapp/get-created-room/",
                {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      "Content-Type": "multipart/form-data",
                    },
                });

                console.log("API Response:", response.data); // Log the response data

                setBookedRoom(await response.data);

        } catch (error) {
            console.log('Error fetching rooms', error);
        }
    };

    useEffect(() => {
        fetchResult(); // Call the API when the component mounts
      }, []); // The empty dependency array ensures this effect runs once after the initial render


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
                            {bookedRoom.rooms? bookedRoom.rooms.map((each)=>(
                                <tr>
                                    <td>{++counterIndex}</td>
                                    <td><img src={each.imageLink} alt="" /></td>
                                    <td>{each.locationName}</td>
                                    <td>{each.coordinates}</td>
                                    <td>{each.roomType}</td>
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
                            )) : <p className="col-10 text-center"> No Rooms To Show</p>}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        <Footer/>
    </>
}
export default CreatedRooms;