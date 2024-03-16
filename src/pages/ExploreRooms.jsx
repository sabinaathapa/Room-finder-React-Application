import React, { useState, useEffect } from "react";
import Footer from "../components/headerfooter/Footer";
import HeaderCommon from "../components/HeaderFooter/Header";
import CarouselComponent from "../components/HomePage/Carousel";
import SearchRoomBar from "../components/SearchRoom";
import GridCard from "../components/GridCard";
import SearchResult from "./SearchResult";
import { Button, Container } from "react-bootstrap";
import axios from 'axios';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  background-color: rgba(203, 228, 222, 0.8);
  color: rgb(203, 228, 222);

  h3 {
    color: #2E4F4F;
  }

  p {
    color: #0E8388;
  }
  #title{
    color: rgb(14, 131, 136);

  }
`;

const ExploreRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomResponse = await axios.get('http://localhost:8000/api/v1/myapp/room-create/', {});
        setRooms(roomResponse.data);
      } catch (error) {
        console.log('Error fetching rooms', error);
      }
    };

    const fetchImage = async () => {
      try {
        const imageResponse = await axios.get('http://localhost:8000/api/v1/myapp/room-image/', {});
        setImages(imageResponse.data);
      } catch (error) {
        console.log('Error fetching image', error);
      }
    };

    const fetchLocation = async () => {
      try {
        const locationResponse = await axios.get('http://localhost:8000/api/v1/myapp/location/');
        setLocation(locationResponse.data);
      } catch (error) {
        console.log('Error fetching location', error);
      }
    };

    fetchData();
    fetchImage();
    fetchLocation();
  }, []);

  return (
    <React.Fragment>
      <HeaderCommon />
      <StyledContainer className="fluid my-4 px-4 py-4" id="exploreRooms">
        <div className="text-center">
          <h3>Explore <span id="title">Available</span> Rooms</h3>
          <p><strong>Below are the rooms available with us the moment.</strong></p>
        </div>
        <GridCard roomDetails={rooms} roomImages={images} roomLocation={location} />
      </StyledContainer>
      <Footer />
    </React.Fragment>
  )
}

export default ExploreRooms;