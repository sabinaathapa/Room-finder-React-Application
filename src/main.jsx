import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderCommon from "./components/HeaderFooter/Header";
import HomeCarousel from "./components/homepage/Carousel";
import Footer from "./components/headerfooter/Footer";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HeaderCommon/>
    <HomeCarousel/>
    <App/>
    <Footer/>
  </React.StrictMode>
)

 

// npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
