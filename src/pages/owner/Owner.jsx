import React from "react";
import {Container, Row } from 'react-bootstrap';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import OwnerHeader from "../../components/headerfooter/OwnerHeader";
import Footer from "../../components/headerfooter/Footer";


const OwnerPage=()=>{
    return(
        
        <React.Fragment>
            <OwnerHeader/>
           
            <Container className="my-5 fluid">
                <Row className="my-2">
                    <h2>Owner Page</h2>
                </Row>

                <Row className="my-2 fluid">
                    <p>Welcome to our Owner's Page, where you can effortlessly manage and showcase your rental spaces. </p>
                     <p>   Whether you have a single room, an entire apartment, or multiple properties, our user-friendly platform empowers you to list and highlight your accommodations seamlessly. With intuitive tools for setting room types, specifying amenities, and uploading captivating images, you can create an enticing profile that attracts potential tenants. </p>
                     <p>   Our robust system ensures that your property details are communicated effectively, making it easy for guests to discover and book their ideal stay. </p>
                        <p>Enjoy the flexibility of controlling availability, setting rental terms, and connecting directly with guests. Join our community of property owners and embark on a hassle-free journey to maximize your rental potential. Your perfect tenant is just a click away!</p>
                </Row>
            </Container>
            
            <Footer/>
        </React.Fragment>

    )
}
export default OwnerPage;
