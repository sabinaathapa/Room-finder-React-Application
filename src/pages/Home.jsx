import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/headerfooter/Footer";
import HeaderCommon from "../components/HeaderFooter/Header";
import CarouselComponent from "../components/HomePage/Carousel";
import SearchRoomBar from "../components/SearchRoom";
import GridCard from "../components/GridCard";
import { Button, Container } from "react-bootstrap";


const Home=()=>{
    return(
        
        <React.Fragment>
            <HeaderCommon/>
            <CarouselComponent/>



            <SearchRoomBar/>

            <Container className="fluid my-4 px-4 py-4" id="exploreRooms" style={{ backgroundColor: "#f0f0f0" }}>
                <div className="text-center">
                    <h3>Explore Available Rooms</h3>
                    <p>Below are the rooms available with us the moment. </p>
                </div>
                <GridCard/>
                <div className="text-center">
                    <Button variant="outline-info">
                        Explore All Rooms
                    </Button>
                </div>
            </Container>
            <Footer/>
            
        </React.Fragment>

    )
}
export default Home;
