import React, { useState } from "react";
import axios from "axios";
import { getAccessToken } from "./authUtils";
import LocationMap from "./Location";

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
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationName, setLocationName] = useState("");

  const handleLocationSelect = (lat, lng) => {
    // setLocationName(locname); 
    setLatitude(lat);
    setLongitude(lng);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = getAccessToken();

    try {
      const formData = new FormData();
      formData.append("room_type", roomType);
      formData.append("no_of_room", noOfRoom);
      formData.append("bathroom_type", bathroomType);
      formData.append("kitchen_slab", kitchenSlab);
      formData.append("rent", rent);
      formData.append("available", available);
      formData.append("wifi", wifi);
      formData.append("water_type", waterType);
      

      images.forEach((image) => {
        formData.append("uploaded_images", image);
      });

      const roomResponse = await axios.post(
        "http://localhost:8000/api/v1/myapp/room-create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Room created successfully.");

  
      const locationFormData = new FormData();
      locationFormData.append("name", locationName);
      locationFormData.append("latitude", latitude);
      locationFormData.append("longitude", longitude);
      locationFormData.append("room_id", roomResponse.data.id);  

      const locationResponse = await axios.post(
        "http://localhost:8000/api/v1/myapp/location/",
        locationFormData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Location sent successfully.");
    } catch (error) {
      console.log("Room creation or location sending unsuccessful.", error);
    }
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
      <form onSubmit={handleSubmit}>
        <label>
          Room Type
          <select
            name="room_type"
            value={roomType}
            onChange={(e) => {
              setRoomType(e.target.value);
            }}
          >
            <option value="SINGLE">Single</option>
            <option value="FLAT">Flat</option>
            <option value="MULTIPLE">Multiple</option>
          </select>
        </label>
        <br />

        <label>
          Number of Room
          <input
            type="number"
            value={noOfRoom}
            onChange={(e) => {
              setNoOfRoom(e.target.value);
            }}
          />
        </label>
        <br />

        <label>
          Bathroom Type
          <select
            name="bathroom_type"
            value={bathroomType}
            onChange={(e) => {
              setBathRoomType(e.target.value);
            }}
          >
            <option value="ATTACHED">Attached</option>
            <option value="SHARING">Sharing</option>
          </select>
        </label>
        <br />

        <label>
          Kitchen Slab
          <input
            type="checkbox"
            checked={kitchenSlab}
            onChange={(e) => {
              setKitchenSlab(e.target.checked);
            }}
          />
        </label>
        <br />

        <label>
          Rent
          <input
            type="number"
            value={rent}
            onChange={(e) => {
              setRent(e.target.value);
            }}
          />
        </label>
        <br />

        <label>
          Available
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => {
              setAvailable(e.target.checked);
            }}
          />
        </label>
        <br />

        <label>
          Wifi
          <input
            type="checkbox"
            checked={wifi}
            onChange={(e) => {
              setWifi(e.target.checked);
            }}
          />
        </label>
        <br />

        <label>
          Water Type
          <select
            name="water_type"
            value={waterType}
            onChange={(e) => {
              setWaterType(e.target.value);
            }}
          >
            <option value="TANKER">Tanker</option>
            <option value="BORING">Boring</option>
            <option value="MELAMCHI">Melamchi</option>
          </select>
        </label>
        <br />


        <label>
          Upload Image
          <input type="file" onChange={handleImageChange} multiple />
        </label>
        <br />
        <div>
        
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                marginRight: "10px",
              }}
            />
          ))}
        </div>
        
        <button type="button" >
          Select Location
        </button>
        
      
      <LocationMap onLocationSelect={handleLocationSelect}/>
       
        <br/><button type="submit">Submit</button>
       
      </form>
    </React.Fragment>
  );
};

export default OwnerRoom;