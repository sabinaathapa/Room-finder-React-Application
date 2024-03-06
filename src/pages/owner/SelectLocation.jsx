import React from "react";
import OwnerHeader from '../../components/headerfooter/OwnerHeader.jsx';
import Footer from '../../components/headerfooter/Footer.jsx';
import LocationMap from "../../components/Location.jsx";
import { Container, Row } from "react-bootstrap";


const SelectLocationPage = ({ roomDetails }) =>{
    return <>
        <OwnerHeader/>
            <Container  className="my-5 fluid">
                <Row className="text-center">
                    <h2>Location Selection</h2>
                    <p>Please select a location</p>
                </Row>

                <Row className=" mx-2 my-4">
                    <h4>Instructions</h4>
                    <ul>
                        <li>You can drag and select the location.</li>
                        <li>You can also type in the search bar the qualified name of location.</li>
                    </ul>
                </Row>

                <LocationMap/>
            </Container>
        <Footer/>
    </>
}

export default SelectLocationPage;