import React from "react";
import OwnerRegistration from "./pages/OwnerRegistration";
import TenantRegistration from "./pages/TenantRegistrationPage";
// import Login from "./components/Login";
import LoginPage from "./pages/Login";
import ProfilePicture from "./components/ProfilePicture";
import DocumentUpload from "./components/DocumentUpload";
import Room from "./components/Room";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Location from "./components/Location";
import RoomDetailPage from "./pages/RoomDetailPage";
import Admin from "./pages/admin";
import UserProfile from "./pages/user/UserProfile";
import MyRooms from "./pages/user/MyRooms";
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
            <Route path="/search-result" element={<SearchResult/>}/>
            <Route path="/get-room-details" element={<RoomDetailPage/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/user-profile" element={<UserProfile/>}/>
            <Route path="/booked-rooms" element={<MyRooms/>}/>
         </Routes>
    </Router>
    );
}
export default RouteApp;
