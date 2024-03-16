import React, {useState, useEffect} from "react";
import Footer from "../components/headerfooter/Footer";
import HeaderCommon from "../components/HeaderFooter/Header";
import CarouselComponent from "../components/HomePage/Carousel";
import SearchRoomBar from "../components/SearchRoom";
import GridCard from "../components/GridCard";
import { Button, Container, Row } from "react-bootstrap";
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from "react-leaflet";


const Home=()=>{
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const [location, setLocation] = useState([]);
    const [availabeLocations, setAvailableLocations] = useState([])



    const locations = [
        {
            "latitude": "27.694196822208610000000000000000",
            "longitude": "85.313369834707390000000000000000"
        },
        {
            "latitude": "27.693837731254320000000000000000",
            "longitude": "85.312500768075210000000000000000"
        },
        // Add more locations here
    ];

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


        const fetchAvailableLocation = async() =>{
            try{
                const availableLocationResposne = await axios.get('http://localhost:8000/api/v1/myapp/get-available-room-location/');
                setAvailableLocations(availableLocationResposne.data);
            }catch(error){
                console.log('Error fetching location', error);
            }
        }

        fetchData();
        fetchImage();
        fetchLocation();
        fetchAvailableLocation();
    }, []);

    return(
        
        <React.Fragment>
            <HeaderCommon/>
            <CarouselComponent/>
            <SearchRoomBar/>

            
            <Container className="fluid">
                <Row>
                <h3>Below are the locations we've rooms on: </h3>
                    <MapContainer
                        center={[27.69419682220861, 85.31336983470739]} // Default center if no locations available
                        zoom={13} // Adjust the zoom level as needed
                        style={{ height: '400px', width: '100%' }}
                        >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {availabeLocations.map((location, index) => (
                            <Marker
                                key={index} // Ensure each marker has a unique key
                                position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
                            />
                        ))}

                    </MapContainer>
                </Row>
            </Container>
            
            <Footer/>
            
        </React.Fragment>

    )
}
export default Home;
