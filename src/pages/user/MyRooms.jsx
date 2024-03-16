import React, { useEffect, useState } from "react";
import HeaderCommon from "../../components/HeaderFooter/Header";
import Footer from "../../components/headerfooter/Footer";
import { Container , Row, Table, Col, Button} from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "../../components/authUtils";

const MyRooms = ()=>{

    const accessToken = getAccessToken();
    const [bookedRoom, setBookedRoom] = useState([]);


    const handleCancelBooking = async(roomId) =>{
      try {
        console.log("Handle Cancel booking Request. ")
        const response = await axios.get(
          `http://localhost:8000/api/v1/myapp/cancel-booking-request/?id=${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json', // Update content type if needed
            },
          }
        );

        window.location.reload(); 
  
      } catch (error) {
        console.error('Error fetching booked rooms', error);
      }

    }
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              'http://localhost:8000/api/v1/myapp/get-user-requested-room/',
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json', // Update content type if needed
                },
              }
            );
      
            setBookedRoom(response.data);
          } catch (error) {
            console.error('Error fetching booked rooms', error);
          }
        };
      
        fetchData(); // Call the fetchData function
      
        // Add an empty dependency array to ensure the effect runs only once
      }, [accessToken]);
   

    let counterIndex=0;

    return <>
        <HeaderCommon/>
            
            <Container className="fluid my-5">
                <Row>
                    <h2>Booked Rooms</h2>
                </Row>

                <Row>
            
                    <Table responsive="sm" className="my-5">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Location Name</th>
                            <th>Co-Ordinates</th>
                            <th>Room Type</th>
                            <th>No. Of Rooms</th>
                            <th>Bathroom Type</th>
                            <th>Kitchen Slab</th>
                            <th>Wifi</th>
                            <th>Water</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {bookedRoom.map((each)=>(
                                <tr>
                                    <td>{++counterIndex}</td>
                                    <td>{each.locationName}</td>
                                    <td>{each.coordinate}</td>
                                    <td>{each.roomType}</td>
                                    <td>{each.noOfRooms}</td>
                                    <td>{each.bathroomType}</td>
                                    <td>{each.kitchenSlab ? "Available" : "No"}</td>
                                    <td>{each.wifi ? "Available" : "No"}</td>
                                    <td>{each.water}</td>
                                    <td>{each.status}</td>
                                    <td>
                                        {each.status !== "PENDING" ? "No actions" : (
                                          <Button variant="outline-danger" onClick={() => handleCancelBooking(each.bookingTableId)}>
                                            Cancel
                                          </Button>
                                        )}
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
export default MyRooms;