import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { getAccessToken } from './authUtils';
import axios from 'axios';


const LocationMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [latitude, setLatitude] = useState(27.7172); 
  const [longitude, setLongitude] = useState(85.3240);
  const [locationSearch, setLocationSearch] = useState('');
  const [currentZoom, setCurrentZoom] = useState(13); // Initial zoom level


  const roomDetailsInStorage = localStorage.getItem("roomDetails");

  const roomDetails = JSON.parse(roomDetailsInStorage);
  // console.log("Room Details In Map Component: " + roomDetails.roomType);


 // ************** API Calls **************************}
 const handleSubmit = async (e) => {
  e.preventDefault();

  const accessToken = getAccessToken();

  try {
    const formData = new FormData();
    formData.append("room_type", roomDetails.roomType);
    formData.append("no_of_room", roomDetails.noOfRoom);
    formData.append("bathroom_type", roomDetails.bathroomType);
    formData.append("kitchen_slab", roomDetails.kitchenSlab);
    formData.append("rent", roomDetails.rent);
    formData.append("available", true);
    formData.append("wifi", roomDetails.wifi);
    formData.append("water_type", roomDetails.waterType);
    

    roomDetails.images.forEach((image) => {
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
    locationFormData.append("name", locationSearch);
    locationFormData.append("latitude", latitude);
    locationFormData.append("longitude", longitude);
    locationFormData.append("room", roomResponse.data.id);  

    console.log("Location Data: ",locationSearch, "Latitude: ", latitude, "Longitude: ", longitude, "room: ", roomResponse.data.id );

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


  // ********************* MAP *********************************
  const mapRef = useRef(null);

  useEffect(() => {
    const mapInstance = L.map(mapRef.current).setView([latitude, longitude], currentZoom); // Use currentZoom for initial view
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance);
  
    // Remove existing marker before adding a new one on zoom/search
    if (marker) {
      mapInstance.removeLayer(marker);
    }
  
    const newMarker = L.marker([latitude, longitude]).addTo(mapInstance);
    setMarker(newMarker);
  
    // Attach click event handler to the map instance
    mapInstance.on('click', (e) => {
      const prevZoom = currentZoom; // Store previous zoom
  
      setMarker(L.marker(e.latlng).addTo(mapInstance));
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
      setCurrentZoom(mapInstance.getZoom()); // Update current zoom
  
      // Maintain zoom if it changed due to marker placement
      if (prevZoom > mapInstance.getZoom()) {
        mapInstance.setZoom(prevZoom);
      }

    });
  
    setMap(mapInstance);
  
    return () => mapInstance.remove();
  }, [latitude, longitude, currentZoom]); // Add currentZoom to dependency
  
  
  
  const handleSearch = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${locationSearch}&format=json`);
    const data = await response.json();
  
    if (data.length > 0) {
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
      setLocationSearch(data[0].display_name);
  
      if (map) {
        map.flyTo([data[0].lat, data[0].lon]);
      }
  
      // No need to set marker here, useEffect will handle it
      // onLocationSelect(locationSearch, data[0].lat, data[0].lon);
    }
  
    setLocationSearch('');
  };

  return (
  
      <Row>
          <Col className='col-8'>
              {/* Map */}
              <div ref={mapRef} className='mx-5' style={{height: '500px'}} />
          </Col>

          <Col className='col-4'>
            {/* Input Form */}
              <Form onSubmit={handleSearch} className='my-3'>
                  <h5>Search</h5>
                  <Form.Group controlId="formGridNoOfRoom">
                    {/* <Form.Label><b>Search Location</b></Form.Label> */}
                    <Form.Control
                      required
                      placeholder="Select number of rooms..."
                      type="text"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                  </Form.Group>

                  <Button type="submit" className='my-2 text-center'>Search</Button>

              </Form>

              {/* //Selected Location Details */}
              <Row className=''>
                <h5>Selected Location: </h5>
              <Table>
                  <thead>
                    <tr>
                      <th>Latitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                      {latitude}
                      </td>
                      <td>
                      {longitude}
                      </td>
                    </tr>
                  </tbody>
              </Table>

              <Button variant='outline-success' onClick={handleSubmit}>Save</Button>
              </Row>
          </Col>
      </Row>
  );
};

export default LocationMap;