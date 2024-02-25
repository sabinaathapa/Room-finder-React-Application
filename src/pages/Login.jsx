import React from "react";
import ReactDOM from "react-dom/client";
import HeaderCommon from "../components/HeaderFooter/Header";
import Footer from "../components/headerfooter/Footer";
import Login from "../components/Login";

function LoginPage(){
   return  <>
   <HeaderCommon/>
   <Login/>
   <Footer/>
   </>
}
export default LoginPage;