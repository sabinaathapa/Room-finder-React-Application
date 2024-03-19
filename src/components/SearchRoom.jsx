import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';

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
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();


  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=a8a787e19c3646bca1b000ac885a306c`
      );
      setSuggestions(response.data.features);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (inputValue.trim().length > 0) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Put the values in local Storage
    localStorage.setItem("searchLocationName", inputValue);
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
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  required
/>
<div style={{ position: 'relative' }}>
    {suggestions.length > 0 && (
      <ul
        style={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: 'white',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          width: '100%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.properties.id}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
            onClick={() => {
              setInputValue(suggestion.properties.formatted);
              setSearchTerm1(suggestion.properties.formatted);
              setSuggestions([]);
            }}
          >
            {suggestion.properties.formatted}
          </li>
        ))}
      </ul>
    )}
  </div>
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