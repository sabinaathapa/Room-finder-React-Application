import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SearchBar = () => {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the search or other actions here
    console.log('Search Terms:', searchTerm1, searchTerm2);
  };

  return (
    <Container className='my-5 center mx-auto' id="roomSearchBar">
      <Row className="justify-content-center">
        <h2>Search for a Room</h2>
        <p>Use the search bar below to search for the room. </p>
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
                  value={searchTerm2}
                  onChange={(e) => setSearchTerm2(e.target.value)}
                />
              </Col>
              <Col>
                <Button variant="secondary" type="submit">
                  Search Rooms
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <br /><br />
        <h5>Guide</h5>
        <ul>
            <li>Enter the location where you want a room nearby.</li>
            <li>Enter the search radius.</li>
            <li>Hit the search button. </li>
        </ul>
      </Row>
    </Container>
  );
};

export default SearchBar;
