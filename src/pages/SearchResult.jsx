import React from "react";
import HeaderCommon from "../components/HeaderFooter/Header";
import Footer from "../components/headerfooter/Footer";
import SearchGridCard from "../components/SearchResult";
import { Container } from "react-bootstrap";

const SearchResult =() =>{
   return  <>
   <HeaderCommon/>
   <Container className="my-5">
      <h3>Search Result</h3>
      
   </Container>
   <SearchGridCard />
   <Footer/>
   </>
}
export default SearchResult;