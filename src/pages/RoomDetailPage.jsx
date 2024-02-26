import React from "react";
import HeaderCommon from "../components/HeaderFooter/Header";
import Footer from "../components/headerfooter/Footer";
import DetailRoom from "../components/DetailRoom";
import { Container } from "react-bootstrap";

function RoomDetailPage(){
   return  <>
   <HeaderCommon/>
   <Container className="my-5">
      <h3>Room Details</h3>
      <p>Below is the detailed description of the room. </p>
   </Container>
   <DetailRoom/>
   <Footer/>
   </>
}
export default RoomDetailPage;