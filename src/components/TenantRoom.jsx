import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "./authUtils";

const TenantRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const acccessToken = getAccessToken();
                const response = await axios.get('http://localhost:8000/api/v1/myapp/room-create/', {
                    headers: {
                        Authorization: `Bearer ${acccessToken}`,
                    },
                });
                setRooms(response.data);
            } catch (error) {
                console.log('Error fetching rooms', error);
            }
        };

        const fetchImage = async() =>{
            try{
                const acccessToken = getAccessToken();
                const response = await axios.get('http://localhost:8000/api/v1/myapp/room-image/',{
                    headers:{
                        Authorization : `Bearer ${acccessToken}`,
                    },
                });
                setImages(response.data);
            }catch (error){
                console.log('Error fetching image', error);
            }
        };

        fetchData();
        fetchImage();
    }, []);

    return (
        <React.Fragment>
            <h2>Rooms List</h2>
            <table>
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Room Type</th>
                            <th>Number of Room</th>
                            <th>Bathroom Type</th>
                            <th>Kitchen Slab</th>
                            <th>Rent</th>
                            <th>Available</th>
                            <th>Wifi</th>
                            <th>Water Type</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room =>(
                            <tr key={room.id}>
                                <td>{room.owner_name}</td>
                                <td>{room.room_type}</td>
                                <td>{room.no_of_room}</td>
                                <td>{room.bathroom_type}</td>
                                <td>{room.kitchen_slab?'Yes':'No'}</td>
                                <td>{room.rent}</td>
                                <td>{room.available?'Yes':'No'}</td>
                                <td>{room.wifi?'Yes':'No'}</td>
                                <td>{room.water_type}</td>
                                <td>
                                {images
                                    .filter((image) => image.room_id === room.id)
                                    .map((filteredImage) => (
                                        <img
                                            key={filteredImage.id}
                                            src={filteredImage.room_image}
                                            alt={`Room ${room.id} Image`}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    ))}
                            </td>
                            </tr>))}
                    </tbody>
            </table>
        </React.Fragment>
    );
};

export default TenantRoom;
