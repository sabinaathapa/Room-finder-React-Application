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
            <Footer/>
            
        </React.Fragment>

    )
}
export default Home;
