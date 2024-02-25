import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/headerfooter/Footer";
import HeaderCommon from "../components/HeaderFooter/Header";
import CarouselComponent from "../components/HomePage/Carousel";
import SearchRoomBar from "../components/SearchRoom";


const Home=()=>{
    return(
        
        <React.Fragment>
            <HeaderCommon/>
            <CarouselComponent/>

            <SearchRoomBar/>
            <Footer/>
            
        </React.Fragment>

    )
}
export default Home;
