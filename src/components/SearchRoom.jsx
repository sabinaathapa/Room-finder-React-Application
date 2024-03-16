import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  // background-color: rgb(44, 51, 51);
  color: rgb(203, 228, 222);

  h2 {
    color: rgb(14, 131, 136);
  }

  p, h5, ul, li{
    color: rgb(44, 51, 51);
  }
  
`;

const StyledButton = styled(Button)`
  background-color: rgb(14, 131, 136);
  border-color: rgb(14, 131, 136);
  color: rgb(203, 228, 222);

  &:hover {
    background-color: rgb(46, 79, 79);
    border-color: rgb(46, 79, 79);
    color: rgb(203, 228, 222);
  }
`;

const StyledForm = styled(Form)`
  .form-control {
    background-color: rgb(46, 79, 79);
    color: rgb(203, 228, 222);
    border-color: rgb(14, 131, 136);
  }

  .form-control::placeholder {
    color: rgb(203, 228, 222);
    opacity: 0.6;
  }
`;

const SearchBar = () => {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchRadius, setSearchRadius] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //Put the values in local Storage
    localStorage.setItem("searchLocationName", searchTerm1);
    localStorage.setItem("searchRadius", searchRadius);

    navigate('/search-result');
  }

  return (
    <StyledContainer className='my-5 center mx-auto' id="roomSearchBar">
      <Row className="justify-content-center">

        <div className="text-center">
          <h2>Search for a Room</h2>
          <p>Use the search bar below to search for the room.</p>
        </div>

        <Col className="mb-1">
          <StyledForm onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Control
                  type="text"
                  placeholder="Enter the location to search for..."
                  value={searchTerm1}
                  onChange={(e) => setSearchTerm1(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter search radius..."
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <StyledButton variant="secondary" type="submit">
                  Search Rooms
                </StyledButton>
              </Col>
            </Row>
          </StyledForm>

          <br /><br />
          <h5>Guide</h5>
          <ul>
            <li>Enter the location where you want a room nearby.</li>
            <li>Enter the search radius.</li>
            <li>Hit the search button.</li>
          </ul>
        </Col>

      </Row>
    </StyledContainer>
  );
};

export default SearchBar;