import React from "react";
import HeaderCommon from "../components/HeaderFooter/Header";
import Footer from "../components/headerfooter/Footer";
import GridCard from "../components/GridCard";
import { Container } from "react-bootstrap";

function LoginPage(){
   return  <>
   <HeaderCommon/>
   <Container className="my-5">
      <h3>Search Result</h3>
      <p>Below are the room in proximity to the location you selected.</p>
   </Container>
   <GridCard/>
   <Footer/>
   </>
}
export default LoginPage;