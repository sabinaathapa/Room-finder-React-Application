import React from "react";
import { Container, Row, Table, Col, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../components/authUtils";

const BookingRequestTable = ({ bookedRoom }) => {
  const [acceptRoomBookingStatus, setacceptRoomBookingStatus] = useState(false);
  const [rejectRoomBookingStatus, setrejectRoomBookingStatus] = useState(false);

  const accessToken = getAccessToken();

  const acceptBookingRequest = async (roomBookId) => {
    try {
      console.log("Called API to accept the room booking request.");

      const response = await axios.get(
        "http://localhost:8000/api/v1/myapp/accept-booking-request/?roomBookId=" + roomBookId,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data); // Log the response data

      setacceptRoomBookingStatus(true);

      window.location.reload(); // Reload the page
    } catch (error) {
      console.log('Error Accepting the Booking request.', error);
    }
  };

  const rejectBookingRequest = async (roomBookId) => {
    try {
      console.log("Called API to Reject the room booking request.");

      const response = await axios.get(
        "http://localhost:8000/api/v1/myapp/reject-booking-request/?roomBookId=" + roomBookId,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data); // Log the response data

      setrejectRoomBookingStatus(true);
      window.location.reload(); // Reload the page
    } catch (error) {
      console.log('Error Accepting the Booking request.', error);
    }
  };

  let counterIndex = 0;

  return (
    <div className="booking-table-container">
      <Table responsive="sm" className="my-5 booking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Room Details:</th>
            <th>Requested By</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedRoom.map((each) => (
            <tr key={each.bookingTableId}>
              <td>{++counterIndex}</td>
              {/* Room Details */}
              <td>
                <p><b>Location Name:</b> {each.locationName}</p>
                <p><b>Coordinates:</b> {each.latitude}, {each.longitude}</p>
                <p><b>Type:</b> {each.roomType}</p>
                <p><b>No. Of Rooms:</b> {each.noOfRooms}</p>
                <p><b>Bathroom Type:</b> {each.bathroomType}</p>
                <p><b>Kitchen Slab:</b> {each.kitchenSlab ? "Available" : "No"}</p>
                <p><b>Wifi:</b> {each.wifi ? "Available" : "No"}</p>
                <p><b>Water:</b> {each.waterType}</p>
              </td>

              {/* User Details */}
              <td>
                <p><b>Name:</b> {each.tenantName}</p>
                <p><b>Email:</b> {each.tenantEmail}</p>
                <p><b>Phone:</b> {each.tenantPhone}</p>
                <p><b>Address:</b> {each.tenantAddress}</p>
                <p><b>Expected Date:</b>{each.expectedDate}</p>
                <p><b>Remarks:</b>{each.remarks}</p>
              </td>

              <td>{each.status}</td>
              <td>
                {(each.status !== "PENDING" ? "No actions can be performed."
                  : <>
                    <Button variant="outline-success" className="mx-2 custom-button" onClick={() => acceptBookingRequest(each.bookingTableId)}> Accept </Button>
                    <Button variant="outline-danger" className="custom-button" onClick={() => rejectBookingRequest(each.bookingTableId)}>
                      Reject
                    </Button>
                  </>)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <style>{`
        .booking-table-container {
          background-color: rgb(203, 228, 222);
          padding: 20px;
          border-radius: 5px;
        }

        .booking-table {
          background-color: rgb(44, 51, 51);
          color: rgb(203, 228, 222);
          border-radius: 5px;
        }

        .booking-table th {
          background-color: rgb(46, 79, 79);
          color: rgb(203, 228, 222);
        }

        .custom-button {
          color: rgb(46, 79, 79);
          border-color: rgb(46, 79, 79);
        }
      `}</style>
    </div>
  );
};

export default BookingRequestTable;