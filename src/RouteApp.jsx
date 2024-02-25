import React from "react";
import OwnerRegistration from "./components/OwnerRegistration";
import TenantRegistration from "./components/TenantRegistration";
// import Login from "./components/Login";
import LoginPage from "./pages/Login";
import ProfilePicture from "./components/ProfilePicture";
import DocumentUpload from "./components/DocumentUpload";
import Room from "./components/Room";
import Home from "./pages/Home";
import Location from "./components/Location";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const RouteApp=()=>{
    return(
        <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/owner-registration" element={<OwnerRegistration/>}/>
            <Route path="/tenant-registration" element={<TenantRegistration/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/profile-picture" element={<ProfilePicture/>}/>
            <Route path="/document-upload" element={<DocumentUpload/>}/>
            <Route path="/room" element={<Room/>}/>  
            <Route path="/location" element={<Location/>}/>
         </Routes>
    </Router>
    );
}
export default RouteApp;
