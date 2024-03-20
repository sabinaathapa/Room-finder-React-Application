import React from "react";
import { Container, Table, Row, Button } from "react-bootstrap";

const DocumentRequest = ({ documents }) => {
  console.log("Document Request Page : ", documents);


  let counter = 0;

  return (
    <div className="booking-table-container my-3">
      <Table responsive="sm" className="my-2 booking-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Document</th>
            <th>Document Type</th>
            <th>User Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((each, index) => (
            <tr key={index}>
                <td>{++counter}</td>
              <td className="">
                <img
                  src={`http://localhost:8000${each.documentImage}`}
                  alt=""
                  style={{ width: '50%', textAlign: 'center' }}
                  className="document-image justify-content-center"
                />
              </td>

              <td>{each.documentType}</td>

              <td>
                <p>
                  <b>Username: </b>
                  {each.userName}
                </p>
                <p>
                  <b>Email: </b>
                  {each.userEmail}
                </p>
                <p>
                  <b>Phone: </b>
                  {each.userPhone}
                </p>
                <p>
                  <b>Address: </b>
                  {each.userAddress}
                </p>
              </td>

              <td>
                {each.status !== "PENDING" ? (
                  "No actions to perform"
                ) : (
                  <div style={{width:'fit-content'}}>
                    <Button
                      variant="outline-success"
                      className="mx-2 custom-button"
                      onClick={() => acceptBookingRequest(each.bookingTableId)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="custom-button"
                      onClick={() => rejectBookingRequest(each.bookingTableId)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
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

export default DocumentRequest;
