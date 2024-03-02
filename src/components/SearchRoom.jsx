import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SearchBar = () => {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchRadius, setSearchRadius] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      const response = await axios.get('http://localhost:8000/api/v1/mpapp/search_location/',{
        params:{
          search_radius:searchRadius
  
        }
      }
      )
      alert("Successfully send the data")
      console.log("Search Radius", response.data)
    }
    catch(error){
      console.log("Error in sending data.", error)
    }
   };

  return (
    <Container className='my-5 center mx-auto' id="roomSearchBar">
      <Row className="justify-content-center">

        <div className="text-center">
        <h2>Search for a Room</h2>
          <p>Use the search bar below to search for the room. </p>
        </div>
      
        <Col className="mb-1">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter the location to search for..."
                  value={searchTerm1}
                  onChange={(e) => setSearchTerm1(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter search radius..."
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="secondary" type="submit">
                  Search Rooms
                </Button>
              </Col>
            </Row>
          </Form>

          <br /><br />
        <h5>Guide</h5>
        <ul>
            <li>Enter the location where you want a room nearby.</li>
            <li>Enter the search radius.</li>
            <li>Hit the search button. </li>
        </ul>
        </Col>

    
      </Row>
    </Container>
  );
};

export default SearchBar;
