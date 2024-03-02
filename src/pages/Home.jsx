import React, {useState, useEffect} from "react";
import Footer from "../components/headerfooter/Footer";
import HeaderCommon from "../components/HeaderFooter/Header";
import CarouselComponent from "../components/HomePage/Carousel";
import SearchRoomBar from "../components/SearchRoom";
import GridCard from "../components/GridCard";
import { Button, Container } from "react-bootstrap";
import axios from 'axios';


const Home=()=>{
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomResponse = await axios.get('http://localhost:8000/api/v1/myapp/room-create/', {
                });
                setRooms(roomResponse.data);
            } catch (error) {
                console.log('Error fetching rooms', error);
            }
        };
       

        const fetchImage = async() =>{
            try{
                const imageResponse = await axios.get('http://localhost:8000/api/v1/myapp/room-image/',{ 
                });
                setImages(imageResponse.data);
            }catch (error){
                console.log('Error fetching image', error);
            }
        };

        const fetchLocation = async()=>{
            try{
                const locationResponse = await axios.get('http://localhost:8000/api/v1/myapp/location/');
                setLocation(locationResponse.data);
            }catch(error){
                console.log('Error fetching location', error);
            }
        };

        fetchData();
        fetchImage();
        fetchLocation();
    }, []);

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
                <GridCard roomDetails={rooms} roomImages={images} roomLocation={location}/>
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
