import React, { useState } from "react";
import { Form, Button , Row, Container, Col} from "react-bootstrap";
import axios from "axios";
import { getAccessToken } from "./authUtils";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
      images
    };

    console.log("Values in Room FOrm: " , roomDetails);

    const stringifiedRoomDetails = JSON.stringify(roomDetails);

    localStorage.setItem("roomDetails", stringifiedRoomDetails);
  
    navigate('/location', {state: roomDetails});
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
          <Form.Control required placeholder="Select number of rooms..."
                type="number"
                value={noOfRoom}
                onChange={(e) => {
                  setNoOfRoom(e.target.value);
                }} />
          </Form.Group>

        </Row>


          <Row className="mb-3">
              {/* Bathroom Type */}
              <Form.Group as={Col} controlId="formGridBathroomType">
            <Form.Label>Select Room Type</Form.Label>
            <Form.Select
              required
              name="bathroom_type"
              value={bathroomType}
              onChange={(e) => {
                setBathRoomType(e.target.value);
              }}
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
              <Form.Control required placeholder="Enter the rent..."
                 type="number"
                 value={rent}
                 onChange={(e) => {
                   setRent(e.target.value);
                 }}
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
              />
            </Form.Group>


             {/* Kitchen Slab Checkbox */}
      <Form.Group as={Col} controlId="formGridKitchenSlab">
        <Form.Check
          type="checkbox"
          label="Kitchen Slab"
          checked={kitchenSlab}
          onChange={(e) => setKitchenSlab(e.target.checked)}
        />
      </Form.Group>
              
              
          <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Please Select a room image: </Form.Label>
              <Form.Control type="file"  onChange={handleImageChange} multiple/>

              {imagePreviews.map((preview, index) => (
            <img className="my-3"
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              style={{
                width:"50%"
              }}
            />
          ))}
            </Form.Group>   
          </Row>

          <Button variant="outline-info" onClick={handleLocationButton}>Proceed To Location Selection</Button>

      </Form>

    </React.Fragment>
  );
};

export default OwnerRoom;