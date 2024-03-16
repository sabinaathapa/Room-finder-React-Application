import React, { useState } from "react";
import { Form, Button, Row, Container, Col } from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "./authUtils";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const OwnerRoom = () => {
  const [roomType, setRoomType] = useState("SINGLE");
  const [noOfRoom, setNoOfRoom] = useState("");
  const [bathroomType, setBathRoomType] = useState("ATTACHED");
  const [kitchenSlab, setKitchenSlab] = useState(false);
  const [rent, setRent] = useState(0);
  const [available, setAvailable] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [waterType, setWaterType] = useState("TANKER");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const locationState = location.state || {};
  const { locationSearch, latitude, longitude } = locationState;

  const handleLocationButton = () => {
    const roomDetails = {
      roomType,
      noOfRoom,
      bathroomType,
      kitchenSlab,
      rent,
      available,
      wifi,
      waterType,
      description,
      images,
    };

    console.log("Values in Room FOrm: ", roomDetails);

    const stringifiedRoomDetails = JSON.stringify(roomDetails);

    localStorage.setItem("roomDetails", stringifiedRoomDetails);

    navigate("/location", { state: roomDetails });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const imagePreviewsArray = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(imagePreviewsArray);
  };

  return (
    <React.Fragment>
      <Container className="my-5">
        <h2 className="text-center mb-4">Owner Room Details</h2>
        <Form>
          <Row className="mb-3">
            {/* SELECT room type  */}
            <Form.Group as={Col} controlId="formGridRoomType">
              <Form.Label>Select Room Type</Form.Label>
              <Form.Select
                required
                name="room_type"
                value={roomType}
                onChange={(e) => {
                  setRoomType(e.target.value);
                }}
                className="custom-select"
              >
                <option value="" disabled>
                  Select room type...
                </option>
                <option value="SINGLE">Single</option>
                <option value="FLAT">Flat</option>
                <option value="MULTIPLE">Multiple</option>
              </Form.Select>
            </Form.Group>

            {/* No. Of Rooms */}
            <Form.Group as={Col} controlId="formGridNoOfRoom">
              <Form.Label>No. of Rooms</Form.Label>
              <Form.Control
                required
                placeholder="Select number of rooms..."
                type="number"
                value={noOfRoom}
                onChange={(e) => {
                  setNoOfRoom(e.target.value);
                }}
                className="custom-input"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* Bathroom Type */}
            <Form.Group as={Col} controlId="formGridBathroomType">
              <Form.Label>Select Bathroom Type</Form.Label>
              <Form.Select
                required
                name="bathroom_type"
                value={bathroomType}
                onChange={(e) => {
                  setBathRoomType(e.target.value);
                }}
                className="custom-select"
              >
                <option value="" disabled>
                  Select bathroom type...
                </option>
                <option value="ATTACHED">Attached</option>
                <option value="SHARING">Sharing</option>
              </Form.Select>
            </Form.Group>

            {/* Rent */}
            <Form.Group as={Col} controlId="formGridRent">
              <Form.Label>Rent</Form.Label>
              <Form.Control
                required
                placeholder="Enter the rent..."
                type="number"
                value={rent}
                onChange={(e) => {
                  setRent(e.target.value);
                }}
                className="custom-input"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            {/* water type */}
            <Form.Group as={Col} controlId="formGridWaterType">
              <Form.Label>Select Water Type</Form.Label>
              <Form.Select
                required
                name="water_type"
                value={waterType}
                onChange={(e) => {
                  setWaterType(e.target.value);
                }}
                className="custom-select"
              >
                <option value="" disabled>
                  Select bathroom type...
                </option>
                <option value="TANKER">Tanker</option>
                <option value="BORING">Boring</option>
                <option value="MELAMCHI">Melamchi</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            {/* Wifi Checkbox */}
            <Form.Group as={Col} controlId="formGridWifi">
              <Form.Check
                type="checkbox"
                label="Wifi"
                checked={wifi}
                onChange={(e) => setWifi(e.target.checked)}
                className="custom-checkbox"
              />
            </Form.Group>

            {/* Kitchen Slab Checkbox */}
            <Form.Group as={Col} controlId="formGridKitchenSlab">
              <Form.Check
                type="checkbox"
                label="Kitchen Slab"
                checked={kitchenSlab}
                onChange={(e) => setKitchenSlab(e.target.checked)}
                className="custom-checkbox"
              />
            </Form.Group>

            {/* Description of room */}
            <Form.Group controlId="formGridDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="custom-textarea"
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Please Select a room image: </Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                multiple
                className="custom-file-input"
              />

              <div className="image-preview-container">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="image-preview"
                  />
                ))}
              </div>
            </Form.Group>
          </Row>

          <div className="text-center">
            <Button
              variant="outline-info"
              onClick={handleLocationButton}
              className="custom-button"
            >
              Proceed To Location Selection
            </Button>
          </div>
        </Form>
      </Container>

      <style>{`
        /* General styles */
        .custom-select,
        .custom-input,
        .custom-textarea,
        .custom-file-input {
          border-radius: 5px;
          border: 1px solid #ccc;
          padding: 8px;
          font-size: 16px;
        }

        .custom-checkbox {
          font-size: 16px;
        }

        .custom-button {
          font-size: 16px;
          padding: 8px 16px;
        }

        /* Image preview styles */
        .image-preview-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .image-preview {
          max-width: 200px;
          max-height: 200px;
          margin-right: 16px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </React.Fragment>
  );
};

export default OwnerRoom;