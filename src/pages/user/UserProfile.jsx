import React from "react";
import HeaderCommon from "../../components/HeaderFooter/Header";
import Footer from "../../components/headerfooter/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProfilePicture from "../../components/ProfilePicture";
import { getAccessToken } from "../../components/authUtils";
import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import DocumentUpload from "../../components/DocumentUpload";

const documentUploaded = false;
const accessToken = getAccessToken();

const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [userImage, setUserImage] = useState(' ');
  const [userDocument, setUserDocument] = useState(' ');

  const fetchUserDetails = async () => {
    try {
      console.log("Fetching User Details From Backend. ");

      const response = await axios.get(
        "http://localhost:8000/api/v1/myapp/get-user-details/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data); // Log the response data

      setUserData(response.data);

      const response1 = await axios.get(
        "http://localhost:8000/api/v1/myapp/get-profile-picture/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response1.data); // Log the response data

      setUserImage(response1.data);

      const documentResponse = await axios.get(
        "http://localhost:8000/api/v1/myapp/get-document-picture/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("User Document Response:", documentResponse.data); // Log the response data

      setUserDocument(documentResponse.data);

    } catch (error) {
      console.log('Error fetching rooms', error);
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Call the API when the component mounts
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError('');

    //Client-side validation
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.")
      return;
    }
    if (newPassword != confirmPassword) {
      setError("Password do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/accounts/update-password/',
        {
          username: userData.username,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
      console.log("Password update response", response.data);
      alert("Password updated successfully.");
    } catch (error) {
      console.log("Error in updating password.", error);
      setError("Failed to update password. Please try again.");
    }

    setNewPassword('');
    setConfirmPassword('');
    setError('');
  }

  return (
    <>
      <HeaderCommon />

      <Container className="fluid my-5">
        <Row>
          <h3 className="text-center mb-4" style={{ color: 'rgb(14, 131, 136)' }}>User Profile</h3>
        </Row>

        <Row className="my-2">
          <Col md={4}>
            <div className="profile-picture-container">
              <img src={`http://localhost:8000${userImage.image}`} alt="" className="profile-picture" />
              <ProfilePicture />
            </div>
          </Col>
          <Col md={8}>
            <div className="user-details-container">
              <h4 className="section-heading" style={{ color: 'rgb(46, 79, 79)' }}>Your Details</h4>
              <div className="user-details">
                <h5><b>Username:</b> <span>{userData.username}</span></h5>
                <h5><b>Phone:</b> <span>{userData.phone}</span></h5>
                <h5><b>Email:</b> <span>{userData.email}</span></h5>
                <h5><b>Address:</b> <span>{userData.address}</span></h5>
              </div>
            </div>
            <div className="password-change-container">
              <h4 className="section-heading" style={{ color: 'rgb(46, 79, 79)' }}>Change your password</h4>
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label><b>New Password</b></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your new password..."
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                  <Form.Label><b>Confirm Password</b></Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter your password..."
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="custom-button">Change Password</Button>
                {error && <p className="text-danger mt-2">{error}</p>}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="fluid my-5">
        <Row>
          <h3 className="text-center mb-4" style={{ color: 'rgb(14, 131, 136)' }}>Your Documents</h3>
          <p className="text-center">Documents must be uploaded before proceeding for Room Booking.</p>
        </Row>

        <Row className="justify-content-center">
          {(userDocument !== undefined) ?
            <div className="document-container">
              <p className="document-label">Below are your uploaded documents:</p>
              <div className="document-details">
                <h6 className="document-type" style={{ color: 'rgb(46, 79, 79)' }}>Document Type: {userDocument.documentType}</h6>
                <img src={`http://localhost:8000${userDocument.documentImage}`} alt="" className="document-image" />
              </div>
            </div>
            : <DocumentUpload />}
        </Row>
      </Container>
      <Footer />

      <style>{`
        .profile-picture-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .profile-picture {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 50%;
          margin-bottom: 16px;
        }

        .user-details-container {
          margin-bottom: 32px;
        }

        .section-heading {
          margin-bottom: 16px;
        }

        .user-details h5 {
          margin-bottom: 8px;
        }

        .password-change-container {
          margin-bottom: 32px;
        }

        .custom-input {
          border-radius: 5px;
          border: 1px solid #ccc;
          padding: 8px;
          font-size: 16px;
        }

        .custom-button{
          font-size: 16px;
          padding: 8px 16px;
          color: rgb(46, 79, 79);
          border-color: rgb(46, 79, 79);
        }

        .document-container {
          text-align: center;
        }

        .document-label {
          margin-bottom: 16px;
        }

        .document-details {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .document-type {
          margin-bottom: 8px;
        }

        .document-image {
          max-width: 300px;
          max-height: 300px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}
export default UserProfile;