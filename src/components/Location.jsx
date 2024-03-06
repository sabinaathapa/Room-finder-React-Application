import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';


const LocationMap = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [latitude, setLatitude] = useState(27.7172); 
  const [longitude, setLongitude] = useState(85.3240);
  const [locationSearch, setLocationSearch] = useState('');
  const [currentZoom, setCurrentZoom] = useState(13); // Initial zoom level


  const mapRef = useRef(null);
  const navigate = useNavigate();
  const handleSave = () => {
     navigate('/room', {
       state: { 
         locationSearch, 
         latitude,
         longitude
       }
     });
  }

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
  
      onLocationSelect("", e.latlng.lat, e.latlng.lng);
    });
  
    setMap(mapInstance);
  
    return () => mapInstance.remove();
  }, [latitude, longitude, onLocationSelect, currentZoom]); // Add currentZoom to dependency
  
  
  
  const handleSearch = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${locationSearch}&format=json`);
    const data = await response.json();
  
    if (data.length > 0) {
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
  
      if (map) {
        map.flyTo([data[0].lat, data[0].lon]);
      }
  
      // No need to set marker here, useEffect will handle it
      onLocationSelect(locationSearch, data[0].lat, data[0].lon);
    }
  
    setLocationSearch('');
  };
  
  // useEffect(() => {
  //   const map = L.map(mapRef.current).setView([latitude, longitude], 13);

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
  //   map.on('click', (e) => {
  //     setMarker(L.marker(e.latlng).addTo(map));
  //     setLatitude(e.latlng.lat);
  //     setLongitude(e.latlng.lng);
      
  //     onLocationSelect("", e.latlng.lat, e.latlng.lng);
  //   });

  //   setMap(map);

  //   return () => map.remove();
  // }, [latitude, longitude, onLocationSelect]);


  // const handleSearch = async (e) => {
  //   e.preventDefault();

  //   const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${locationSearch}&format=json`);
  //   const data = await response.json();

  //   if (data.length > 0) {
  //     setLatitude(data[0].lat);
  //     setLongitude(data[0].lon);

  //     if (map) {
  //       map.flyTo([data[0].lat, data[0].lon]);
        
  //       setMarker(L.marker([data[0].lat, data[0].lon]).addTo(map));  
  //     }

  //     onLocationSelect(locationSearch, data[0].lat, data[0].lon);
  //   }

  //   setLocationSearch('');
  // }

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

              <Button variant='outline-success' onClick={handleSave}>Save</Button>
              </Row>
          </Col>
      </Row>
  );
};

export default LocationMap;