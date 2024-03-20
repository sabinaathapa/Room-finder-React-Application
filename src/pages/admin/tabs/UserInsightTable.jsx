import React from "react";
import { Container, Table, Row, Button } from "react-bootstrap";

const UserInsightTable = ({ users }) => {
  console.log("Document Request Page : ", users);


  let counter = 0;

  return (
    <div className="my-3">
      <Table responsive="sm" className="my-2">
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((each, index) => (
            <tr key={index}>
                <td>{++counter}</td>
                <td>{each.userName}</td>
                <td>{each.userEmail}</td>
                <td>{each.userPhone}</td>
                <td>{each.userAddress}</td>

              <td>
           
                <Button
                    variant="outline-danger"
                    onClick={() => rejectBookingRequest(each.bookingTableId)}
                >
                    Delete
                </Button>
            
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

export default UserInsightTable;
