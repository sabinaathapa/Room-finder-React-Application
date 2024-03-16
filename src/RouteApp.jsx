import React from "react";
import OwnerRegistration from "./pages/OwnerRegistration";
import TenantRegistration from "./pages/TenantRegistrationPage";
import LoginPage from "./pages/Login";
import ProfilePicture from "./components/ProfilePicture";
import DocumentUpload from "./components/DocumentUpload";
import Room from "./components/Room";
import Home from "./pages/Home";
import SearchResult from './pages/SearchResult';
import LocationDeniedPage from "./pages/NearYou/LocationDeniedPage";
import LocationAccess from "./pages/NearYou/LocationAccessPage";
import LocationRequestModal from "./pages/NearYou/LocationRequestComponent";
import RoomDetailPage from "./pages/RoomDetailPage";
import OwnerPage from "./pages/owner/Owner";
import UserProfile from "./pages/user/UserProfile";
import MyRooms from "./pages/user/MyRooms";
import CreatedRooms from "./pages/owner/CreatedRooms";
import BookingRequest from "./pages/owner/BookingRequests";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateRoomForm from "./pages/owner/CreateNewRoom";
import ExploreRooms from "./pages/ExploreRooms";
import SelectLocationPage from "./pages/owner/SelectLocation";

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
            <Route path="/location" element={<SelectLocationPage/>}/>
            <Route path="/search-result" element={<SearchResult/>}/>
            <Route path="/get-room-details/:roomId" element={<RoomDetailPage/>}/>
            <Route path="/owner-page" element={<OwnerPage/>}/>
            <Route path="/user-profile" element={<UserProfile/>}/>
            <Route path="/booked-rooms" element={<MyRooms/>}/>
            <Route path="/created-rooms" element={<CreatedRooms/>}/>
            <Route path="/booking-request" element={<BookingRequest/>}/>
            <Route path="/create-room" element={<CreateRoomForm/>}/>
            <Route path="/explore-rooms" element={<ExploreRooms/>}/>
            <Route path="/location-request" element={<LocationRequestModal/>}/>
            <Route path="/location-denied" element={<LocationDeniedPage/>}/>
            <Route path="/location-access" element={<LocationAccess/>}/>
         </Routes>
    </Router>
    );
}
export default RouteApp;
